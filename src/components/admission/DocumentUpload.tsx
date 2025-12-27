import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader2,
  Camera,
  Trash2,
  Eye,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DocumentUpload as DocumentUploadType, 
  DocumentType, 
  ChildProfile,
  ExtractedDocData
} from "@/types/admission";
import { 
  mockOcrExtraction, 
  validateDocument, 
  getRequiredDocuments 
} from "@/services/admissionApi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DocumentUploadProps {
  childProfile: ChildProfile;
  documents: DocumentUploadType[];
  onDocumentsChange: (documents: DocumentUploadType[]) => void;
  onContinue: () => void;
}

export default function DocumentUpload({
  childProfile,
  documents,
  onDocumentsChange,
  onContinue,
}: DocumentUploadProps) {
  const [processingDoc, setProcessingDoc] = useState<DocumentType | null>(null);
  const [extractedDataDialog, setExtractedDataDialog] = useState<{
    open: boolean;
    data: ExtractedDocData | null;
    docType: DocumentType | null;
  }>({ open: false, data: null, docType: null });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeDocType, setActiveDocType] = useState<DocumentType | null>(null);

  const requiredDocs = getRequiredDocuments();

  const getDocumentStatus = (docType: DocumentType) => {
    return documents.find(d => d.type === docType);
  };

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: DocumentType
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, PNG, or PDF.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB.");
      return;
    }

    setProcessingDoc(docType);

    try {
      // Simulate OCR extraction
      const extractedData = await mockOcrExtraction(docType, childProfile);
      
      // Validate against profile
      const validation = validateDocument(extractedData, childProfile);

      const newDoc: DocumentUploadType = {
        id: `doc_${Date.now()}`,
        type: docType,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        status: validation.isValid ? "verified" : "mismatch",
        extractedData,
        mismatchDetails: validation.mismatchDetails,
      };

      // Update documents
      const updatedDocs = documents.filter(d => d.type !== docType);
      updatedDocs.push(newDoc);
      onDocumentsChange(updatedDocs);

      // Show result
      if (validation.isValid) {
        toast.success("Document verified successfully!");
        setExtractedDataDialog({ open: true, data: extractedData, docType });
      } else {
        toast.warning("Document has mismatches. Please review.");
      }
    } catch (error) {
      toast.error("Failed to process document. Please try again.");
    } finally {
      setProcessingDoc(null);
      setActiveDocType(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = (docType: DocumentType) => {
    setActiveDocType(docType);
    fileInputRef.current?.click();
  };

  const handleRemoveDocument = (docType: DocumentType) => {
    const updatedDocs = documents.filter(d => d.type !== docType);
    onDocumentsChange(updatedDocs);
    toast.success("Document removed");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "mismatch":
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "pending":
        return <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success/10 text-success border-success/30">Verified</Badge>;
      case "mismatch":
        return <Badge className="bg-accent/10 text-accent border-accent/30">Mismatch</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/30">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return null;
    }
  };

  const uploadedCount = documents.filter(d => d.status === "verified").length;
  const requiredCount = requiredDocs.filter(d => d.required).length;
  const allRequiredUploaded = requiredDocs
    .filter(d => d.required)
    .every(d => documents.find(doc => doc.type === d.type && doc.status === "verified"));

  return (
    <div className="flex flex-col h-full">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => activeDocType && handleFileSelect(e, activeDocType)}
      />

      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Document Upload</h2>
            <p className="text-sm text-muted-foreground">
              Upload required documents for verification
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{uploadedCount} of {requiredCount} required</span>
          </div>
          <Progress value={(uploadedCount / requiredCount) * 100} className="h-2" />
        </div>
      </div>

      {/* OCR Info Banner */}
      <div className="mx-4 mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-2">
          <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-primary">Smart Document Scanning</p>
            <p className="text-muted-foreground mt-0.5">
              Our AI automatically extracts and validates information from your documents
            </p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {requiredDocs.map((doc) => {
          const uploadedDoc = getDocumentStatus(doc.type);
          const isProcessing = processingDoc === doc.type;

          return (
            <motion.div
              key={doc.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className={cn(
                  "overflow-hidden transition-all",
                  uploadedDoc?.status === "verified" && "border-success/50",
                  uploadedDoc?.status === "mismatch" && "border-accent/50"
                )}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          uploadedDoc ? "bg-muted" : "bg-primary/5 border-2 border-dashed border-primary/30"
                        )}
                      >
                        {isProcessing ? (
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        ) : uploadedDoc ? (
                          getStatusIcon(uploadedDoc.status)
                        ) : (
                          <FileText className="w-5 h-5 text-primary/50" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{doc.label}</h3>
                          {doc.required && (
                            <Badge variant="outline" className="text-xs py-0">
                              Required
                            </Badge>
                          )}
                        </div>
                        {uploadedDoc ? (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {uploadedDoc.fileName}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            JPG, PNG or PDF (max 5MB)
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {uploadedDoc ? (
                        <>
                          {getStatusBadge(uploadedDoc.status)}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleRemoveDocument(doc.type)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUploadClick(doc.type)}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Mismatch Warning */}
                  {uploadedDoc?.status === "mismatch" && uploadedDoc.mismatchDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 p-3 rounded-lg bg-accent/10 border border-accent/30"
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-accent">Data Mismatch Detected</p>
                          <p className="text-muted-foreground mt-0.5">
                            {uploadedDoc.mismatchDetails}
                          </p>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto mt-1 text-accent"
                            onClick={() => handleUploadClick(doc.type)}
                          >
                            Re-upload Document
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Extracted Data Preview */}
                  {uploadedDoc?.status === "verified" && uploadedDoc.extractedData && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 p-3 rounded-lg bg-success/5 border border-success/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-success font-medium">Data Extracted</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setExtractedDataDialog({
                            open: true,
                            data: uploadedDoc.extractedData!,
                            docType: doc.type,
                          })}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t bg-card">
        <Button
          className="w-full"
          size="lg"
          onClick={onContinue}
          disabled={!allRequiredUploaded}
        >
          {allRequiredUploaded ? "Continue to Review" : `Upload ${requiredCount - uploadedCount} more required document${requiredCount - uploadedCount !== 1 ? "s" : ""}`}
        </Button>
      </div>

      {/* Extracted Data Dialog */}
      <Dialog
        open={extractedDataDialog.open}
        onOpenChange={(open) => setExtractedDataDialog(prev => ({ ...prev, open }))}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Extracted Information
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {extractedDataDialog.data && Object.entries(extractedDataDialog.data).map(([key, value]) => {
              if (!value) return null;
              const label = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
              
              if (typeof value === "object") {
                return (
                  <div key={key} className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey} className="flex justify-between text-sm pl-3">
                        <span className="text-muted-foreground">{subKey}</span>
                        <span className="font-medium">{subValue as string}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              
              return (
                <div key={key} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
