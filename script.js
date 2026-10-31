// ========================================================= AMBIKA JEWELLERY========================================================= Main JavaScript  =========================================================


// ========================================================= MOBILE NAVIGATION =========================================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    // Close mobile menu after clicking a link

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


// ========================================================= 2. FAQ ACCORDION =========================================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {

        // Close other FAQ items

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            }

        });


        // Toggle current FAQ

        item.classList.toggle("active");

        if (item.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


// =========================================================  3. SCROLL REVEAL ANIMATION =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// ========================================================= 4. ACTIVE NAVIGATION  =========================================================

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-menu a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});

// ========================================================  5. CONTACT FORM - FORMSUBMIT AJAX =========================================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        const originalButtonHTML = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        formMessage.style.display = "block";
        formMessage.textContent = "Sending your enquiry...";
        formMessage.style.color = "";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {

                formMessage.textContent =
                    "Thank you! Your enquiry has been sent successfully.";

                formMessage.style.color = "green";

                contactForm.reset();

            } else {

                formMessage.textContent =
                    "Unable to send your enquiry. Please try again.";

                formMessage.style.color = "red";

            }

        } catch (error) {

            console.error("FormSubmit error:", error);

            formMessage.textContent =
                "Connection error. Please try again.";

            formMessage.style.color = "red";

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;

        }

    });

}

// ========================================================= 6. CURRENT YEAR  =========================================================

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// =========================================================7. HEADER SHADOW ON SCROLL =========================================================

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 25px rgba(33, 27, 22, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


// ========================================================= 8. PREVENT EMPTY SOCIAL LINKS =========================================================

const emptyLinks =
    document.querySelectorAll(
        '.social-icons a[href="#"], .footer-social a[href="#"]'
    );


emptyLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});


// ========================================================= 9. IMAGE LOADING FALLBACK =========================================================

const images =
    document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener("error", () => {

        console.warn(
            "Image could not be loaded:",
            image.src
        );

    });

});


// ========================================================= 10. ESC KEY - CLOSE MOBILE MENU =========================================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");


            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    }

});


// ========================================================= 11. CLOSE MENU WHEN CLICKING OUTSIDE =========================================================

document.addEventListener("click", event => {

    if (!navMenu || !menuBtn) return;


    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);


    if (
        navMenu.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navMenu.classList.remove("active");


        const icon =
            menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


// ========================================================= 12. INITIAL PAGE LOAD =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Make hero visible immediately

    const heroReveal =
        document.querySelector(".hero .reveal");

    if (heroReveal) {

        setTimeout(() => {

            heroReveal.classList.add("show");

        }, 200);

    }

});

/* ========================================================= JEWELLERY COLLECTION GALLERY ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const categoryItems =
        document.querySelectorAll(".collection-category");

    const collectionModal =
        document.getElementById("collectionModal");

    const collectionClose =
        document.getElementById("collectionClose");

    const collectionOverlay =
        document.querySelector(".collection-modal-overlay");

    const collectionTitle =
        document.getElementById("collectionTitle");

    const collectionCategory =
        document.getElementById("collectionCategory");

    const collections =
        document.querySelectorAll(".collection-images");


    /* =====================================================  CATEGORY NAMES ===================================================== */

    const categoryNames = {

        rings: {
            label: "Elegant Collection",
            title: "Elegant Rings"
        },

        necklaces: {
            label: "Royal Collection",
            title: "Necklaces"
        },

        earrings: {
            label: "Elegant Collection",
            title: "Earrings"
        },

        gold: {
            label: "Pure Elegance",
            title: "Gold Collection"
        },

        traditional: {
            label: "Heritage Designs",
            title: "Traditional Jewellery"
        },

         bangles: {
            label: "Elegant Collection",
            title: "Bangles Collection"
        },

    };


    /* ===================================================== OPEN COLLECTION ===================================================== */

    categoryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const category =
                this.getAttribute("data-category");

            collections.forEach(function (collection) {

                collection.classList.remove("active");

            });


            const selectedCollection =
                document.querySelector(
                    `.collection-images[data-collection="${category}"]`
                );


            if (selectedCollection) {

                selectedCollection.classList.add("active");

            }


            if (categoryNames[category]) {

                collectionCategory.textContent =
                    categoryNames[category].label;

                collectionTitle.textContent =
                    categoryNames[category].title;

            }


            collectionModal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* ===================================================== CLOSE COLLECTION ===================================================== */

    function closeCollection() {

        collectionModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    collectionClose.addEventListener(
        "click",
        closeCollection
    );


    collectionOverlay.addEventListener(
        "click",
        closeCollection
    );


    /* =====================================================  IMAGE VIEWER  ===================================================== */

    const imageViewer =
        document.getElementById("imageViewer");

    const viewerImage =
        document.getElementById("viewerImage");

    const viewerClose =
        document.getElementById("viewerClose");

    const viewerPrev =
        document.getElementById("viewerPrev");

    const viewerNext =
        document.getElementById("viewerNext");


    let currentImages = [];

    let currentIndex = 0;


    /* =====================================================  COLLECTION PHOTO CLICK ===================================================== */

    document.querySelectorAll(".collection-photo img")
        .forEach(function (image) {

            image.addEventListener("click", function () {

                const parentCollection =
                    this.closest(".collection-images");

                currentImages =
                    Array.from(
                        parentCollection.querySelectorAll(
                            ".collection-photo img"
                        )
                    )
                    .filter(function (img) {

                        return img.getAttribute("src") &&
                               img.getAttribute("src") !== "#";

                    });


                currentIndex =
                    currentImages.indexOf(this);


                if (currentIndex === -1) {

                    currentIndex = 0;

                }


                showViewerImage();

                imageViewer.classList.add("active");

            });

        });


    /* =====================================================  SHOW IMAGE ===================================================== */

    function showViewerImage() {

        if (!currentImages.length) {

            return;

        }


        viewerImage.src =
            currentImages[currentIndex].src;

        viewerImage.alt =
            currentImages[currentIndex].alt;

    }


    /* =====================================================  NEXT ===================================================== */

    viewerNext.addEventListener(
        "click",
        function () {

            if (!currentImages.length) {
                return;
            }

            currentIndex++;

            if (currentIndex >= currentImages.length) {

                currentIndex = 0;

            }

            showViewerImage();

        }
    );


    /* ===================================================== PREVIOUS  ===================================================== */

    viewerPrev.addEventListener(
        "click",
        function () {

            if (!currentImages.length) {
                return;
            }

            currentIndex--;

            if (currentIndex < 0) {

                currentIndex =
                    currentImages.length - 1;

            }

            showViewerImage();

        }
    );


    /* =====================================================  CLOSE VIEWER ===================================================== */

    function closeViewer() {

        imageViewer.classList.remove("active");

        viewerImage.src = "#";

    }


    viewerClose.addEventListener(
        "click",
        closeViewer
    );


    /* =====================================================  KEYBOARD ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (!imageViewer.classList.contains("active")) {

                if (event.key === "Escape" && collectionModal.classList.contains("active")) {
                    closeCollection();
                }

                return;

            }


            if (event.key === "ArrowRight") {

                viewerNext.click();

            }


            if (event.key === "ArrowLeft") {

                viewerPrev.click();

            }


            if (event.key === "Escape") {

                closeViewer();

            }

        }
    );

});