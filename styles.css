/* Custom Styles */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

.movie-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1f2937;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

.movie-card .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.movie-card .play-button {
  background: rgba(239, 68, 68, 0.9);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
}

.movie-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25;
}

.movie-meta {
  font-size: 0.75rem;
  color: #9ca3af;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quality-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: bold;
}

.rating-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-slide.active {
  opacity: 1;
}

.tab-button {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-button.active {
  color: white;
  background: #ef4444;
}

.tab-button:hover {
  color: white;
  background: #374151;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.desktop-tab-button {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.desktop-tab-button.active {
  color: white;
  background: #ef4444;
}

.desktop-tab-button:hover {
  color: white;
  background: #374151;
}

.desktop-tab-content {
  display: none;
}

.desktop-tab-content.active {
  display: block;
}

.player-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.player-container .aspect-video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.player-placeholder {
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.player-placeholder::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(239, 68, 68, 0.1) 50%, transparent 70%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.player-placeholder .play-icon {
  width: 4rem;
  height: 4rem;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
}

.player-placeholder .play-icon:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.player-preview {
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
}

.search-suggestions {
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.suggestion-item:hover {
  background: #374151;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.filter-tag button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

.genre-filter {
  cursor: pointer;
  transition: all 0.3s ease;
}

.genre-filter.active {
  background: #ef4444 !important;
  color: white !important;
}

.quality-filter {
  cursor: pointer;
  transition: all 0.3s ease;
}

.quality-filter.active {
  background: #ef4444 !important;
  color: white !important;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Full Page Video Player Styles */
.full-page-player {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.full-page-player.hidden {
  display: none;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.player-title h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.player-title span {
  color: #ef4444;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.player-controls-top {
  display: flex;
  gap: 1rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.close-btn:hover {
  background: #ef4444;
}

.player-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.video-container {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 675px;
  position: relative;
}

.embedded-video {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-wrapper iframe {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  border-radius: 8px;
}

.video-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

.video-loading i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ef4444;
}

/* Responsive Design */
@media (max-width: 768px) {
  .player-header {
    padding: 1rem;
  }

  .player-title h3 {
    font-size: 1rem;
  }

  .player-content {
    padding: 1rem;
  }

  .control-btn {
    width: 36px;
    height: 36px;
  }

  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .movie-title {
    font-size: 0.75rem;
  }

  .movie-meta {
    font-size: 0.625rem;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Loading Animation */
.loading-spinner {
  border: 2px solid #374151;
  border-top: 2px solid #ef4444;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Focus styles for accessibility */
button:focus,
a:focus,
input:focus,
select:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

/* Download Button Enhancement */
.download-btn {
  position: relative;
  overflow: hidden;
}

.download-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.download-btn:hover::before {
  left: 100%;
}

/* Enhanced Full Page Video Player Styles */
.full-page-player {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.98);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.full-page-player.hidden {
  display: none;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(31, 41, 55, 0.8));
  border-bottom: 1px solid rgba(239, 68, 68, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.player-title h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.player-title span {
  color: #ef4444;
  font-size: 1rem;
  margin-left: 0.75rem;
  font-weight: 500;
}

.player-controls-top {
  display: flex;
  gap: 1rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  backdrop-filter: blur(10px);
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
  background: #ef4444;
  border-color: #ef4444;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.fullscreen-btn:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.player-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

.video-container {
  width: 100%;
  height: 100%;
  max-width: 1400px;
  max-height: 800px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}

.embedded-video-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
}

.video-wrapper iframe {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  border-radius: 16px !important;
  background: #000 !important;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(31, 41, 55, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.video-info {
  text-align: center;
  color: white;
  padding: 2rem;
}

.video-info h4 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

.video-info p {
  font-size: 1.2rem;
  color: #ef4444;
  font-weight: 500;
}

.video-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  background: linear-gradient(135deg, #1f2937, #111827);
  border-radius: 16px;
}

.video-loading .loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(239, 68, 68, 0.3);
  border-top: 3px solid #ef4444;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.video-loading p {
  font-size: 1.1rem;
  color: #9ca3af;
  font-weight: 500;
}

.video-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1f2937, #111827);
  border-radius: 16px;
}

.video-error i {
  font-size: 4rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.video-error h3 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.video-error p {
  font-size: 1.1rem;
  color: #9ca3af;
  margin-bottom: 2rem;
  max-width: 400px;
}

.retry-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.player-footer {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(31, 41, 55, 0.8));
  border-top: 1px solid rgba(239, 68, 68, 0.3);
  backdrop-filter: blur(10px);
}

.player-info {
  text-align: center;
}

.player-tip {
  color: #9ca3af;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Fullscreen styles */
.full-page-player:fullscreen {
  background: #000;
}

.full-page-player:fullscreen .player-header,
.full-page-player:fullscreen .player-footer {
  background: rgba(0, 0, 0, 0.8);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .player-header {
    padding: 1rem;
  }

  .player-title h3 {
    font-size: 1.2rem;
  }

  .player-title span {
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }

  .player-content {
    padding: 1rem;
  }

  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .video-info h4 {
    font-size: 1.5rem;
  }

  .video-info p {
    font-size: 1rem;
  }

  .video-error i {
    font-size: 3rem;
  }

  .video-error h3 {
    font-size: 1.5rem;
  }

  .video-error p {
    font-size: 1rem;
  }
}

/* Animation keyframes */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Enhanced loading animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.video-loading {
  animation: pulse 2s ease-in-out infinite;
}

/* Smooth transitions for all player elements */
.full-page-player * {
  transition: all 0.3s ease;
}
