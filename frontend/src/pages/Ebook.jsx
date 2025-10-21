import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Ebook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk filter dan pencarian
  const [searchTerm, setSearchTerm] = useState("Pendidikan Anak");
  const [query, setQuery] = useState("Pendidikan Anak");
  const [sortBy, setSortBy] = useState("relevance"); // 'relevance', 'newest', 'oldest', 'a-z', 'z-a'

  // useCallback untuk mencegah pembuatan ulang fungsi di setiap render
  const fetchBooks = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: query,
          orderBy: sortBy === "relevance" ? "relevance" : "newest",
          maxResults: 20,
          printType: "books",
        },
      });

      let fetchedBooks = response.data.items || [];

      // Apply additional sorting if needed
      if (sortBy === "oldest" || sortBy === "a-z" || sortBy === "z-a") {
        fetchedBooks = sortBooks(fetchedBooks, sortBy);
      }

      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Gagal mengambil data dari Google Books API:", err);
      setError("Gagal mengambil data buku. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [query, sortBy]);

  // Function to handle custom sorting
  const sortBooks = (books, sortType) => {
    const sortedBooks = [...books];

    switch (sortType) {
      case "oldest":
        return sortedBooks.sort((a, b) => {
          const dateA = a.volumeInfo.publishedDate ? new Date(a.volumeInfo.publishedDate) : new Date(0);
          const dateB = b.volumeInfo.publishedDate ? new Date(b.volumeInfo.publishedDate) : new Date(0);
          return dateA - dateB;
        });

      case "a-z":
        return sortedBooks.sort((a, b) => {
          const titleA = a.volumeInfo.title?.toLowerCase() || "";
          const titleB = b.volumeInfo.title?.toLowerCase() || "";
          return titleA.localeCompare(titleB);
        });

      case "z-a":
        return sortedBooks.sort((a, b) => {
          const titleA = a.volumeInfo.title?.toLowerCase() || "";
          const titleB = b.volumeInfo.title?.toLowerCase() || "";
          return titleB.localeCompare(titleA);
        });

      default:
        return sortedBooks;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">Digital Library</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Perpustakaan <span className="text-primary">Digital</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Jelajahi ribuan e-book dan sumber belajar digital untuk menunjang pendidikan dan pengembangan diri putra-putri Anda.</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm mb-12">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-700">Cari Buku</label>
                <Input
                  type="text"
                  placeholder="Cari judul buku, penulis, atau topik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
              </div>

              <div className="w-full lg:w-48 space-y-2">
                <label className="text-sm font-medium text-gray-700">Urutkan</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300">
                    <SelectValue placeholder="Urutkan berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevansi</SelectItem>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="oldest">Terlama</SelectItem>
                    <SelectItem value="a-z">A - Z</SelectItem>
                    <SelectItem value="z-a">Z - A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 w-full lg:w-auto">
                Cari Buku
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600 font-light">Memuat koleksi buku...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <p className="text-red-500 font-semibold text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Menampilkan <span className="font-semibold text-primary">{books.length}</span> buku untuk "{query}"
              </p>
              <div className="text-sm text-gray-500">
                Diurutkan berdasarkan:
                <span className="font-semibold text-gray-700 ml-1">
                  {sortBy === "relevance" && "Relevansi"}
                  {sortBy === "newest" && "Terbaru"}
                  {sortBy === "oldest" && "Terlama"}
                  {sortBy === "a-z" && "A - Z"}
                  {sortBy === "z-a" && "Z - A"}
                </span>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {books.map((book) => (
                <a href={book.volumeInfo.previewLink} key={book.id} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
                    <CardContent className="p-0 relative">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={book.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/300x400/e2e8f0/94a3b8?text=No+Cover"}
                          alt={book.volumeInfo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* Overlay Effect */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </CardContent>
                    <CardFooter className="p-4 flex-grow flex flex-col items-start bg-gradient-to-b from-white to-gray-50/50">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">{book.volumeInfo.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-1 mb-2">{book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Penulis tidak diketahui"}</p>
                      <div className="mt-auto flex justify-between items-center w-full">
                        <span className="text-xs text-gray-400">{book.volumeInfo.publishedDate ? new Date(book.volumeInfo.publishedDate).getFullYear() : "Tahun tidak diketahui"}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Baca</span>
                      </div>
                    </CardFooter>
                  </Card>
                </a>
              ))}
            </div>
          </>
        )}

        {!loading && !error && books.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <p className="text-gray-500 text-lg mb-2">Tidak ada buku yang ditemukan</p>
            <p className="text-gray-400 text-sm">Tidak ada hasil untuk "{query}". Coba gunakan kata kunci lain.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ebook;
