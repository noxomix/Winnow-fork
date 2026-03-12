from typing import Optional
from winnow.client import Winnow

try:
    from langchain_core.documents import Document
    from langchain_core.retrievers import BaseRetriever
    from langchain_core.callbacks import CallbackManagerForRetrieverRun
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False

class WinnowRetriever:
    """
    Wraps any LangChain retriever and compresses retrieved docs before returning.

    Usage:
        base_retriever = vectorstore.as_retriever()
        retriever = WinnowRetriever(base_retriever, compression_ratio=0.5)
        docs = retriever.get_relevant_documents("your question")
    """

    def __init__(self, retriever, compression_ratio: float = 0.5,
                 rag_mode: bool = True, base_url: Optional[str] = None):
        if not LANGCHAIN_AVAILABLE:
            raise ImportError("langchain-core is required. Run: pip install langchain-core")
        self.retriever = retriever
        self.client = Winnow(base_url=base_url) if base_url else Winnow()
        self.compression_ratio = compression_ratio
        self.rag_mode = rag_mode

    def get_relevant_documents(self, query: str) -> list:
        docs = self.retriever.get_relevant_documents(query)
        compressed = []
        for doc in docs:
            result = self.client.compress(
                text=f"Question: {query}\n\nDocument: {doc.page_content}",
                compression_ratio=self.compression_ratio,
                rag_mode=self.rag_mode
            )
            doc.page_content = result["output"]
            compressed.append(doc)
        return compressed
