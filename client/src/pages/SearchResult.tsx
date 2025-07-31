import React, { useEffect, useState, useRef } from "react";
import { Heart, Star, Search, BookOpen, Sparkles, Database, FileText, BookIcon, Lightbulb, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Navbar from "@/components/ui/Navbar";
import FooterSection from "@/components/layouts/FooterSection";

// Import using your project's actual path structure
import { useRecommendations } from "@/hooks/useApi";
import { EnhancedResult } from "@/services/api.types";
import { useLocation, useNavigate } from "react-router-dom";
import SearchSection from "@/components/ui/SearchSection";

// Define the brand colors
const BRAND_COLORS = {
  primary: "#880015", // redcustom
  secondary: "#F2DFD8", // gcustom
  primaryLight: "#B8001D",
  primaryDark: "#5A000E",
  accent: "#D4BFB8",
};

const SearchResult = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EnhancedResult[]>([]);
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set());
  const [searchStage, setSearchStage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const loadingTimerRef = useRef<number | null>(null);
  const placeholderDataUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYyIi8+PC9zdmc+';
  const navigate = useNavigate();

  const {
    loading,
    error: apiError,
    fetchRecommendations
  } = useRecommendations();

  const [error, setError] = useState("");
  const location = useLocation();

  // Function to get completed searches from session storage
  const getCompletedSearches = (): Set<string> => {
    const storedSearches = sessionStorage.getItem('completedSearches');
    if (storedSearches) {
      try {
        return new Set(JSON.parse(storedSearches));
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  };

  // Function to save completed searches to session storage
  const saveCompletedSearch = (query: string) => {
    const completedSearches = getCompletedSearches();
    completedSearches.add(query);
    sessionStorage.setItem('completedSearches', JSON.stringify(Array.from(completedSearches)));
  };

  // Check if search is already completed
  const isSearchCompleted = (query: string): boolean => {
    const completedSearches = getCompletedSearches();
    return completedSearches.has(query);
  };

  // Function to retrieve cached results from session storage
  const getCachedResults = (query: string): EnhancedResult[] | null => {
    const cachedData = sessionStorage.getItem(`searchResults_${query}`);
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // Function to cache results in session storage
  const cacheResults = (query: string, results: EnhancedResult[]) => {
    sessionStorage.setItem(`searchResults_${query}`, JSON.stringify(results));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query") || "";

    setQuery(searchQuery); // set in state for controlled input
    
    if (searchQuery.trim()) {
      // Check if we've already performed this search
      if (isSearchCompleted(searchQuery)) {
        // Get cached results if available
        const cachedResults = getCachedResults(searchQuery);
        if (cachedResults && cachedResults.length > 0) {
          setResults(cachedResults);
          setSimulatedLoading(false);
          setShowResults(true);
        } else {
          // If no cached results, perform search but skip animation
          handleSearch(searchQuery);
          setSimulatedLoading(false);
          setShowResults(true);
        }
      } else {
        // New search - show animation and perform search
        setSimulatedLoading(true);
        setShowResults(false);
        handleSearch(searchQuery);

        // Set min loading time to ensure animation completes
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
        }

        loadingTimerRef.current = window.setTimeout(() => {
          setSimulatedLoading(false);
          setShowResults(true);
          // Mark this search as completed
          saveCompletedSearch(searchQuery);
        }, 6000); // Ensure at least 6 seconds of animation
      }
    }
  }, [location.search]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  // Animation sequence effect
  useEffect(() => {
    if (simulatedLoading) {
      // Reset to first stage when loading starts
      setSearchStage(0);
      setShowFooter(false);

      // Cycle through the stages
      const stageInterval = setInterval(() => {
        setSearchStage(prevStage => {
          // Ensure we cycle through all stages before finishing
          if (prevStage >= 3) {
            return 3; // Stay on final stage
          }
          return prevStage + 1;
        });
      }, 1500); // Change stage every 1.5 seconds

      return () => clearInterval(stageInterval);
    } else {
      const footerTimer = setTimeout(() => {
        setShowFooter(true);
      }, 300);
      return () => clearTimeout(footerTimer);
    }
  }, [simulatedLoading]);

  const handleSearch = async (searchQuery: string) => {
    setError("");
    try {
      const data = await fetchRecommendations(searchQuery);
      if (data) {
        const enhancedResults = data.enhanced_response || [];
        setResults(enhancedResults);
        // Cache the results
        cacheResults(searchQuery, enhancedResults);
      }
    } catch (err) {
      navigate("/error")
      setSimulatedLoading(false);
      setShowResults(true);
    }
  };

  const displayError = apiError?.message || error;

  const toggleLike = (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation(); // Prevent the card click from triggering
    setLikedBooks(prev => {
      const newSet = new Set(prev);
      newSet.has(bookId) ? newSet.delete(bookId) : newSet.add(bookId);
      return newSet;
    });
  };

  const handleBookClick = (bookId: string) => {
    // Ensure we pass the raw string ID without $oid wrapper
    const id = bookId;
    navigate(`/book/${encodeURIComponent(id)}`);
  }

  // Get relevancy badge color based on score
  const getRelevancyColor = (score: number) => {
    const scorePercent = Math.round(score * 100);
    if (scorePercent >= 80) return "#4CAF50"; // Green for high relevancy
    if (scorePercent >= 50) return "#FFA000"; // Yellow/amber for medium relevancy
    return "#E53935"; // Red for low relevancy
  };

  // Check if element is near the left edge of the screen
  const isNearLeftEdge = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    // If element is within 100px of the left edge
    return rect.left < 100;
  };

  // Check if element is near the right edge of the screen
  const isNearRightEdge = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    // If element is within 100px of the right edge
    return rect.right > viewportWidth - 100;
  };

  // Animation stages content
  const renderAnimationStage = () => {
    const stages = [
      {
        icon: <BookIcon size={24} />,
        title: "Finding Books",
        description: "Searching through thousands of titles for you..."
      },
      {
        icon: <Lightbulb size={24} />,
        title: "Understanding Your Request",
        description: "Our AI is figuring out exactly what you're looking for..."
      },
      {
        icon: <Sparkles size={24} />,
        title: "Matching Perfect Titles",
        description: "Finding the most relevant books to your search..."
      },
      {
        icon: <BookMarked size={24} />,
        title: "Finalizing Top Picks",
        description: "Organizing the perfect recommendations for you..."
      }
    ];

    const currentStage = stages[searchStage];
    const progress = (searchStage + 1) * 25;

    return (
      <div className="w-full max-w-md mx-auto py-8 px-4 relative">
        {/* Book Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full" style={{
              background: `conic-gradient(${BRAND_COLORS.primary} ${progress}%, ${BRAND_COLORS.secondary} 0%)`,
            }}></div>

            {/* Inner circle */}
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <div className="relative">
                {/* Book animation */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Book cover */}
                  <div className="absolute w-16 h-20 rounded-r-md"
                    style={{ backgroundColor: BRAND_COLORS.primary }}>
                  </div>

                  {/* Book pages animation */}
                  <div className="absolute w-16 h-20 origin-left"
                    style={{
                      animation: 'flipPage 1.5s infinite',
                      backgroundColor: BRAND_COLORS.secondary,
                      transformStyle: 'preserve-3d',
                    }}>
                  </div>

                  {/* Add sparkle effect */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    {Array(5).fill(0).map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: `${Math.random() * 6 + 2}px`,
                          height: `${Math.random() * 6 + 2}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          opacity: 0,
                          animation: `sparkle 2s infinite ${i * 0.4}s`,
                          boxShadow: `0 0 4px 2px rgba(255, 255, 255, 0.7)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Current stage icon */}
                <div
                  className="absolute -bottom-2 -right-2 p-2 rounded-full"
                  style={{
                    backgroundColor: BRAND_COLORS.primary,
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {currentStage.icon}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage title and description */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND_COLORS.primary }}>
            {currentStage.title}
          </h3>
          <p className="text-sm text-gray-600">
            {currentStage.description}
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex justify-between items-center mb-4">
          {stages.map((stage, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="relative flex items-center justify-center rounded-full w-8 h-8 text-xs font-bold mb-1"
                style={{
                  backgroundColor: idx <= searchStage ? BRAND_COLORS.primary : BRAND_COLORS.secondary,
                  color: idx <= searchStage ? 'white' : BRAND_COLORS.primaryDark,
                  transition: 'all 0.3s ease',
                  border: `2px solid ${idx <= searchStage ? BRAND_COLORS.primary : 'transparent'}`
                }}
              >
                {idx + 1}
                {idx === searchStage && (
                  <div className="absolute w-full h-full rounded-full animate-ping" style={{
                    backgroundColor: BRAND_COLORS.primary,
                    opacity: 0.3
                  }}></div>
                )}
              </div>

              {/* Label underneath step number (Visible on md screens or larger) */}
              <span className="hidden md:block text-xs text-center" style={{
                color: idx <= searchStage ? BRAND_COLORS.primary : 'gray',
                maxWidth: '70px'
              }}>
                {stage.title}
              </span>
            </div>
          ))}
        </div>

        {/* Progress lines connecting the steps */}
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: BRAND_COLORS.primary,
              backgroundImage: `linear-gradient(90deg, ${BRAND_COLORS.primaryDark}, ${BRAND_COLORS.primary}, ${BRAND_COLORS.primaryLight})`
            }}
          ></div>

          {/* Moving highlight effect */}
          <div
            className="absolute top-0 left-0 h-full w-20 bg-white opacity-20"
            style={{
              transform: `translateX(${progress}%)`,
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
        </div>

        {/* Visual loading indicator */}
        <div className="flex justify-center space-x-2 items-center">
          <span className="text-sm" style={{ color: BRAND_COLORS.primary }}>
            Finding the perfect books for you
          </span>
          <div className="flex items-center space-x-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{
                  backgroundColor: BRAND_COLORS.primary,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.6s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Custom CSS animations */}
        <style>{`
          @keyframes flipPage {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(-160deg); }
            100% { transform: rotateY(0deg); }
          }
          
          @keyframes sparkle {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 0.8; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
          }
        `}</style>
      </div>
    );
  };

  // Component for the adaptive tooltip
  const AdaptiveTooltip = ({ book, index }: { book: EnhancedResult; index: number }) => {
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState('center');

    useEffect(() => {
      const handleMouseEnter = () => {
        if (tooltipRef.current) {
          const element = tooltipRef.current.parentElement;
          if (element) {
            const isLeft = isNearLeftEdge(element);
            const isRight = isNearRightEdge(element);

            if (isLeft) {
              setTooltipPosition('left');
            } else if (isRight) {
              setTooltipPosition('right');
            } else {
              setTooltipPosition('center');
            }
          }
        }
      };

      const badgeElement = document.getElementById(`relevancy-badge-${book._id.$oid}`);
      if (badgeElement) {
        badgeElement.addEventListener('mouseenter', handleMouseEnter);
        return () => {
          badgeElement.removeEventListener('mouseenter', handleMouseEnter);
        };
      }
    }, [book._id.$oid]);

    const tooltipClasses = {
      base: "absolute hidden group-hover:block bottom-full mb-2 w-48 p-2 text-xs bg-gray-800 text-white rounded-lg",
      left: "left-0",
      center: "left-1/2 -translate-x-1/2",
      right: "right-0"
    };

    const arrowClasses = {
      base: "absolute top-full w-2 h-2 bg-gray-800 rotate-45",
      left: "left-4",
      center: "left-1/2 -translate-x-1/2",
      right: "right-4"
    };

    return (
      book.match_reason ? (
        <div
          ref={tooltipRef}
          className={`${tooltipClasses.base} ${tooltipClasses[tooltipPosition as keyof typeof tooltipClasses]}`}
        >
          <div className="max-h-24 overflow-y-auto">
            {book.match_reason}
          </div>
          <div className={`${arrowClasses.base} ${arrowClasses[tooltipPosition as keyof typeof arrowClasses]}`}></div>
        </div>
      ) : null
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="w-full px-4 py-8 md:py-12 flex-grow">
        {/* Search Bar - Now conditionally rendered based on loading state */}
        {(!loading && !simulatedLoading) && <SearchSection />}

        {displayError && <p className="text-red-500 text-center mb-4">{displayError}</p>}

        {/* AI Enhanced Animation Loader */}
        {(loading || simulatedLoading) && renderAnimationStage()}

        {/* Results Grid */}
        {showResults && !loading && !simulatedLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {results.map((book, index) => (
              <Card
                key={book._id.$oid}
                className="hover:shadow-md transition-shadow relative cursor-pointer"
                onClick={() => handleBookClick(book._id.$oid)}
              >
                {/* Relevance Score Badge - Updated with dynamic colors and position-aware tooltip */}
                <div
                  id={`relevancy-badge-${book._id.$oid}`}
                  className="absolute top-2 left-2 text-white px-3 py-1 rounded-full text-xs z-10 group"
                  style={{
                    backgroundColor: getRelevancyColor(book.relevance_score)
                  }}
                >
                  {`${Math.round(book.relevance_score * 100)}% Relevant`}

                  {/* Tooltip that adapts to screen position */}
                  <AdaptiveTooltip book={book} index={index} />
                </div>

                <CardContent className="p-3 h-full flex flex-col overflow-hidden">
                  <div className="relative mb-3 flex-shrink-0">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-lg">
                      <img
                        src={book.thumbnailUrl}
                        alt={book.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-all duration-300"
                      />
                    </div>

                    {/* Availability Badge */}
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
                          onClick={(e) => toggleLike(e, book._id.$oid)}
                          className="flex-shrink-0 mt-1"
                          aria-label={likedBooks.has(book._id.$oid) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart
                            className={`w-5 h-5 cursor-pointer transition-all ${likedBooks.has(book._id.$oid)
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

                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${idx < Math.floor(Number(book.averageRatings?.$numberInt || 0))
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({Number(book.averageRatings?.$numberInt || 0).toFixed(1)})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {showResults && !loading && !simulatedLoading && results.length === 0 && (
          <div className="text-center text-gray-500 mb-8">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">Search for books using keywords like:</p>
            <p className="text-gray-600 mt-2">
              "Computer Science textbooks", "AI research papers", or "Engineering journals"
            </p>
          </div>
        )}
      </section>
      {showFooter && <FooterSection />}
    </div>
  );
};

export default SearchResult;