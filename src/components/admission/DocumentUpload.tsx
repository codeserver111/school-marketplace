import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
  Sparkles,
  Shield,
  FileCheck,
  ImageIcon,
  IdCard
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

const docIcons: Record<DocumentType, React.ReactNode> = {
  photo: <Camera className="w-5 h-5" />,
  parent_id: <IdCard className="w-5 h-5" />,
  birth_certificate: <FileCheck className="w-5 h-5" />,
  transfer_certificate: <FileText className="w-5 h-5" />,
  marksheet: <FileText className="w-5 h-5" />,
  address_proof: <FileText className="w-5 h-5" />,
};

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
  const mandatoryDocs = requiredDocs.filter(d => d.required);
  const optionalDocs = requiredDocs.filter(d => !d.required);

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
        toast.success("Document uploaded successfully!");
        if (docType !== "photo" && docType !== "parent_id") {
          setExtractedDataDialog({ open: true, data: extractedData, docType });
        }
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
        return <Badge className="bg-success/10 text-success border-success/30 text-xs">✓ Done</Badge>;
      case "mismatch":
        return <Badge className="bg-accent/10 text-accent border-accent/30 text-xs">Review</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/30 text-xs">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary" className="text-xs">Processing</Badge>;
      default:
        return null;
    }
  };

  const uploadedRequiredCount = mandatoryDocs.filter(d => 
    documents.find(doc => doc.type === d.type && (doc.status === "verified" || doc.status === "mismatch"))
  ).length;
  const uploadedOptionalCount = optionalDocs.filter(d => 
    documents.find(doc => doc.type === d.type && (doc.status === "verified" || doc.status === "mismatch"))
  ).length;
  
  const allRequiredUploaded = mandatoryDocs.every(d => 
    documents.find(doc => doc.type === d.type && (doc.status === "verified" || doc.status === "mismatch"))
  );

  const renderDocCard = (doc: { type: DocumentType; label: string; required: boolean; description?: string }, isRequired: boolean) => {
    const uploadedDoc = getDocumentStatus(doc.type);
    const isProcessing = processingDoc === doc.type;

    return (
      <motion.div
        key={doc.type}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className={cn(
            "overflow-hidden transition-all border-2",
            uploadedDoc?.status === "verified" && "border-success/50 bg-success/5",
            uploadedDoc?.status === "mismatch" && "border-accent/50 bg-accent/5",
            !uploadedDoc && isRequired && "border-primary/30 bg-primary/5",
            !uploadedDoc && !isRequired && "border-border bg-card"
          )}
        >
          <div className="p-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                  uploadedDoc?.status === "verified" && "bg-success/20 text-success",
                  uploadedDoc?.status === "mismatch" && "bg-accent/20 text-accent",
                  !uploadedDoc && isRequired && "bg-primary/20 text-primary",
                  !uploadedDoc && !isRequired && "bg-muted text-muted-foreground"
                )}
              >
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : uploadedDoc ? (
                  getStatusIcon(uploadedDoc.status)
                ) : (
                  docIcons[doc.type]
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{doc.label}</h3>
                  {uploadedDoc && getStatusBadge(uploadedDoc.status)}
                </div>
                
                {uploadedDoc ? (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {uploadedDoc.fileName}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {doc.description || "JPG, PNG or PDF (max 5MB)"}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  {uploadedDoc ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={() => handleUploadClick(doc.type)}
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Replace
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:text-destructive"
                        onClick={() => handleRemoveDocument(doc.type)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant={isRequired ? "default" : "outline"}
                      className="h-8"
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
                  <div className="text-xs">
                    <p className="font-medium text-accent">Data Mismatch</p>
                    <p className="text-muted-foreground mt-0.5">
                      {uploadedDoc.mismatchDetails}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Extracted Data Preview */}
            {uploadedDoc?.status === "verified" && uploadedDoc.extractedData && 
             Object.keys(uploadedDoc.extractedData).length > 0 && 
             doc.type !== "photo" && doc.type !== "parent_id" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 p-3 rounded-lg bg-success/5 border border-success/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Sparkles className="w-3 h-3 text-success" />
                    <span className="text-success font-medium">AI extracted data</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs px-2"
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
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-muted/30">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => activeDocType && handleFileSelect(e, activeDocType)}
      />

      {/* Header */}
      <div className="p-4 border-b bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Upload Documents</h2>
            <p className="text-sm text-muted-foreground">
              Only 2 documents required to proceed
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Required documents</span>
            <span className="font-semibold text-primary">{uploadedRequiredCount} of {mandatoryDocs.length}</span>
          </div>
          <Progress value={(uploadedRequiredCount / mandatoryDocs.length) * 100} className="h-2" />
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Required Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm text-primary">Required Documents</h3>
            <Badge variant="default" className="text-xs">Mandatory</Badge>
          </div>
          <div className="space-y-3">
            {mandatoryDocs.map((doc) => renderDocCard(doc, true))}
          </div>
        </div>

        {/* Optional Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-sm text-muted-foreground">Optional Documents</h3>
            <Badge variant="outline" className="text-xs">Recommended</Badge>
          </div>
          <p className="text-xs text-muted-foreground -mt-1 mb-2">
            Upload these for better school matching and faster verification
          </p>
          <div className="space-y-3">
            {optionalDocs.map((doc) => renderDocCard(doc, false))}
          </div>
        </div>

        {/* Optional count indicator */}
        {uploadedOptionalCount > 0 && (
          <div className="text-center py-2">
            <Badge variant="secondary" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              {uploadedOptionalCount} optional document{uploadedOptionalCount > 1 ? 's' : ''} uploaded
            </Badge>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t bg-card/80 backdrop-blur-sm">
        {allRequiredUploaded ? (
          <Button
            className="w-full h-12 text-base font-semibold"
            size="lg"
            onClick={onContinue}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Continue to Review
          </Button>
        ) : (
          <div className="space-y-2">
            <Button
              className="w-full h-12"
              size="lg"
              variant="outline"
              disabled
            >
              Upload {mandatoryDocs.length - uploadedRequiredCount} required document{mandatoryDocs.length - uploadedRequiredCount !== 1 ? 's' : ''} to continue
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Only child's photo and parent ID are required
            </p>
          </div>
        )}
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
