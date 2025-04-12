
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

// In a real application, these would be fetched from Discord
const demoImages = [
  {
    id: "1",
    url: "https://i.imgur.com/JKzGCLY.jpeg",
    title: "Downtown Street Scene",
  },
  {
    id: "2",
    url: "https://i.imgur.com/kJFhRtA.jpeg",
    title: "Police Lineup",
  },
  {
    id: "3",
    url: "https://i.imgur.com/VuHuHkF.jpeg",
    title: "Nighttime Heist",
  },
  {
    id: "4",
    url: "https://i.imgur.com/hMmF86K.jpeg",
    title: "Car Meet",
  },
  {
    id: "5",
    url: "https://i.imgur.com/l4s1TOS.jpeg",
    title: "Beach Party",
  },
];

const ImageGallery = () => {
  const [images, setImages] = useState(demoImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // In a real app, this would fetch images from Discord API
  useEffect(() => {
    // Simulated API call
    setLoading(true);
    // Simulate fetching images from Discord
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 px-4 bg-tunisien-dark">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Server <span className="text-tunisien-red">Gallery</span>
          </h2>
          <p className="text-tunisien-gray text-lg max-w-2xl mx-auto">
            Take a look at some of the moments captured on our server. These images are
            shared directly from our Discord community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[400px] bg-secondary rounded-lg border border-tunisien-red/20">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tunisien-red"></div>
              <p className="text-tunisien-gray">Loading gallery...</p>
            </div>
          </div>
        ) : images.length > 0 ? (
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden group">
            {/* Main Image */}
            <div
              className="absolute inset-0 transition-opacity duration-500 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentIndex].url})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-lg font-medium">{images[currentIndex].title}</h3>
            </div>

            {/* Thumbnail navigation */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 px-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index ? "w-8 bg-tunisien-red" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[400px] bg-secondary rounded-lg border border-tunisien-red/20">
            <div className="flex flex-col items-center space-y-4">
              <ImageIcon size={48} className="text-tunisien-gray" />
              <p className="text-tunisien-gray">No images available</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageGallery;
