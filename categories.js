// Categories page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeCategoriesPage()
})

function initializeCategoriesPage() {
  // Add any category-specific initialization here
  // For now, the categories are static HTML

  // Add click tracking for analytics (if needed)
  trackCategoryClicks()
}

function trackCategoryClicks() {
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const categoryName = this.querySelector("h3").textContent
      console.log(`Category clicked: ${categoryName}`)
      // Add analytics tracking here if needed
    })
  })
}
