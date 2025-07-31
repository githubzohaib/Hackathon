// src/pages/BookDetail.tsx

import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/layouts/FooterSection";
import BookSummary from "@/components/ui/BookSummary";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "@/services/api.service";
import { Book } from "@/services/api.types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import YouMightLike from "@/components/layouts/YouMightLike";

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookId) {
          throw new Error("No book ID provided");
        }

        // Ensure the ID is in the correct format
        const validId = bookId.startsWith('{') ? 
          JSON.parse(bookId).$oid : 
          bookId;

        const data = await apiService.getBookById(validId);
        setBook(data);
      } catch (err) {
       navigate("/error")
        setError(err instanceof Error ? err.message : "Failed to fetch book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);


  // console.log(book)
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="w-full px-4 py-8 md:py-8 flex-grow">
        <BookSummary book={book} />
        <YouMightLike book={book}/>
      </section>
      <FooterSection />
    </div>
  );
};

export default BookDetail;