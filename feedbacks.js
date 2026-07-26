async function loadTestimonials() {

    const container = document.getElementById(
        "testimonials-container"
    );

    container.innerHTML = `
    <div class="loading-review">
      🍨 Loading customer reviews...
    </div>
  `;

    try {

        const response = await fetch(
            "https://sheetdb.io/api/v1/e2v7zny9bt2w6"
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch testimonials"
            );
        }

        const data = await response.json();

        container.innerHTML = "";

        if (!data || data.length === 0) {

            container.innerHTML = `
        <div class="loading-review">
          No customer reviews yet ❤️
        </div>
      `;

            return;
        }

        // Duplicate for smooth infinite marquee
        const latestReviews = [
            ...data.reverse().slice(0, 8),
            // ...data.reverse().slice(0, 8)
        ];

        latestReviews.forEach(item => {

            if (!item['Can we feature your review on our website?'] || item['Can we feature your review on our website?'].toLowerCase() !== 'no') {
                           

            const name =
                item['Name '] || "Anonymous Customer";

            const review =
                item["How was your experience?"] ||
                "Amazing experience!";

            const rating =
                parseInt(item['Rating'] || 5);

            // Generate stars dynamically
            const stars = "⭐".repeat(rating);

            const testimonial = document.createElement("div");

            testimonial.classList.add(
                "testimonial-inline"
            );

            testimonial.innerHTML = `

                <span class="review-stars">
                ${item['Which flavour did you try?'] || "Unknown Flavour"}
                </span>

                <span class="review-stars">
                ${stars}
                </span>

                <span class="review-text">
                "${review}"
                </span>

                <span class="review-name">
                — ${name}
                </span>

                <span class="verified-inline">
                ✓ Verified Purchase
                </span>

            `;
            container.appendChild(testimonial);
        }
        });

    } catch (error) {

        console.error(
            "Testimonial Load Error:",
            error
        );

        container.innerHTML = `
      <div class="loading-review error">
        Unable to load reviews 😔
      </div>
    `;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadTestimonials
);
