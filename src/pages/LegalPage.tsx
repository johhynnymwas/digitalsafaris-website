import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { api } from "../api/axios";

type LegalDocumentType = "privacy-policy" | "terms-of-service";

interface LegalDocument {
  title?: string;
  content?: string;
  html?: string;
  body?: string;
  updatedAt?: string;
  updated_at?: string;
}

interface LegalPageProps {
  documentType: LegalDocumentType;
}

const titles: Record<LegalDocumentType, string> = {
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
};

const getDocument = (response: { data: unknown }): LegalDocument => {
  const data = response.data as { document?: LegalDocument; data?: LegalDocument } & LegalDocument;
  return data.document || data.data || data;
};

export const LegalPage: React.FC<LegalPageProps> = ({ documentType }) => {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const loadDocument = async () => {
      try {
        const response = await api.get(`/web/legal/${documentType}`);
        if (isCurrent) {
          setDocument(getDocument(response));
          setError(false);
        }
      } catch {
        if (isCurrent) setError(true);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadDocument();
    return () => {
      isCurrent = false;
    };
  }, [documentType]);

  const title = document?.title || titles[documentType];
  const content = document?.content || document?.html || document?.body;
  const updatedAt = document?.updatedAt || document?.updated_at;

  return (
    <div className="bg-[#f9f7f4] min-h-screen text-[#191816] pt-8 pb-20">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#5e5950] hover:text-[#c47c2b] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <header className="border-b border-[#e6dfd5] pb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eae3d9] text-[#191816] text-xs font-bold uppercase tracking-wider mb-5">
            <FileText className="w-3.5 h-3.5" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">{title}</h1>
          {updatedAt && <p className="mt-4 text-sm text-[#8e877e]">Last updated: {updatedAt}</p>}
        </header>

        <article className="mt-10 bg-white border border-[#e6dfd5] rounded-2xl p-6 sm:p-10 text-[#5e5950] leading-relaxed">
          {isLoading && <p>Loading {title.toLowerCase()}...</p>}
          {!isLoading && error && <p>We could not load this document right now. Please try again later.</p>}
          {!isLoading && !error && content && (
            <div className="whitespace-pre-wrap">{content}</div>
          )}
          {!isLoading && !error && !content && <p>This document is not available yet.</p>}
        </article>
      </section>
    </div>
  );
};