import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import apiService from "../../services/api.service";
import { Book, EnhancedResult, SimilarBookRequest, RecommendationResponse } from "../../services/api.types";

interface YouMightLikeProps {
  book?: Book;
}
type MongoIntWrapper = { $numberInt: string };
export default function YouMightLike({ book }: YouMightLikeProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [enhancedBooks, setEnhancedBooks] = useState<EnhancedResult[]>([]);
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSimilarBooks() {
      setIsLoading(true);
      setError(null);
      
      try {
        if (book && book._id) {
          // Create request object for similar books API
          const request: SimilarBookRequest = {
            book_id: book._id.$oid,
            title: book.title,
            summary: book.summary || "",
            // Join the subject array if it's an array, otherwise use a default string
            subject: Array.isArray(book.subject) ? book.subject.join(" ") : ""
          };
          
          // Call the API service to get similar books
          const response: RecommendationResponse = await apiService.getSimilarBooks(request);
          
          if (response.recommendations && response.recommendations.length > 0) {
            setBooks(response.recommendations);
            
            // Store enhanced results separately if available
            if (response.enhanced_response && response.enhanced_response.length > 0) {
              setEnhancedBooks(response.enhanced_response);
            }
          } else if (response.enhanced_response && response.enhanced_response.length > 0) {
            setBooks(response.enhanced_response);
            setEnhancedBooks(response.enhanced_response);
          } else {
            setBooks([]);
            setEnhancedBooks([]);
          }
        } else {
          // If no book is provided, don't show any recommendations
          setBooks([]);
          setEnhancedBooks([]);
          setError("No book information available to generate recommendations.");
        }
      } catch (error) {
        console.error("Failed to fetch similar books:", error);
        setError("Failed to load similar books. Please try again later.");
        setBooks([]);
        setEnhancedBooks([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSimilarBooks();
  }, [book]);

  const getRelevancyColor = (score: number) => {
    if (score >= 0.8) return "#10B981"; // green
    if (score >= 0.6) return "#3B82F6"; // blue
    if (score >= 0.4) return "#F59E0B"; // amber
    return "#EF4444"; // red
  };

  // Find enhanced data for a book if it exists
  const getEnhancedData = (bookId: string) => {
    return enhancedBooks.find(eb => eb._id.$oid === bookId);
  };

  const handleBookClick = (id: string) => {
    window.location.href = `/book/${id}`;
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedBooks(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const target =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scroll("left");
      else if (e.key === "ArrowRight") scroll("right");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const formatYear = (yearInt?: MongoIntWrapper) => {
    if (!yearInt || !yearInt.$numberInt) return "Unknown";
    return yearInt.$numberInt;
  };
  
  
  // Only display the component if there are books to show
  if (!isLoading && books.length === 0 && !error) {
    return null; // Don't render anything if no recommendations
  }
  
  return (
    <div className="px-4 mt-8 md:px-12 relative">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">You Might Like</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recommendations available at this time.
        </div>
      ) : (
        <>
          {/* Only show scroll buttons if there are enough books to scroll */}
          {books.length > 3 && (
            <>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 z-10">
                <button
                  onClick={() => scroll("left")}
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-100"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 z-10">
                <button
                  onClick={() => scroll("right")}
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-100"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </>
          )}

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {books.map(book => {
              const enhancedData = getEnhancedData(book._id.$oid);
              return (
                <Card
                  key={book._id.$oid}
                  className="hover:shadow-md transition-shadow relative cursor-pointer min-w-[220px] w-[220px] md:min-w-[240px] md:w-[240px] flex-shrink-0 snap-start"
                  onClick={() => handleBookClick(book._id.$oid)}
                >
                 
                  

                  <CardContent className="p-3 h-full flex flex-col overflow-hidden">
                    <div className="relative mb-3 flex-shrink-0">
                      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                        <img
                          src={book.thumbnailUrl }
                          alt={book.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "";
                          }}
                        />
                      </div>
                      {book.availableInLibrary && (
                        <div className="absolute bottom-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded-md text-xs">
                          Available In Library
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-sm line-clamp-2 pr-2">
                            {book.title}
                          </h3>
                          <button
                            onClick={e => toggleLike(e, book._id.$oid)}
                            className="flex-shrink-0 mt-1"
                            aria-label={likedBooks.has(book._id.$oid) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Heart
                              className={`w-5 h-5 cursor-pointer transition-all ${
                                likedBooks.has(book._id.$oid)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-300 hover:text-red-500"
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {book.authors?.join(", ")}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {Array(5).fill(0).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-4 h-4 ${
                                idx < Math.floor(Number(book.averageRatings?.$numberInt || 0))
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({Number(book.averageRatings?.$numberInt || 0)})
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{formatYear(book.publicationYear)}</span>
                          
                          {book.subject && book.subject.length > 0 && (
                            <>
                              <span className="mx-1">•</span>
                              <Tag className="w-3 h-3" />
                              <span className="line-clamp-1">
                                {book.subject.slice(0, 2).join(", ")}
                              </span>
                            </>
                          )}
                        </div>
                        
                        {enhancedData && enhancedData.match_reason && (
                          <div className="mt-1 text-xs text-gray-500 italic">
                            {enhancedData.match_reason}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}