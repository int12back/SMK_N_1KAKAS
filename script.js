document.addEventListener("DOMContentLoaded", function () {
  // Loading Screen
  setTimeout(function () {
    document.querySelector(".loading-screen").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".loading-screen").style.display = "none";
    }, 500);
  }, 1500);

  // Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  navToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close sidebar if open on mobile
        if (window.innerWidth <= 992) {
          sidebar.classList.remove("active");
          mainContent.classList.remove("shifted");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Submenu Toggle
  const profileLink = document.querySelector(
    '.nav-links li a[href="#profile"]'
  );
  if (profileLink) {
    profileLink.addEventListener("click", function (e) {
      if (window.innerWidth > 992) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        submenu.classList.toggle("active");
      }
    });
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Academic Tabs
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add active class to clicked button and corresponding pane
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Facilities Upload Preview
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const uploadPreview = document.getElementById("uploadPreview");

  if (fileInput && uploadPreview) {
    fileInput.addEventListener("change", function () {
      uploadPreview.innerHTML = "";

      if (this.files.length > 10) {
        alert("Anda hanya dapat mengupload maksimal 10 foto.");
        this.value = "";
        return;
      }

      Array.from(this.files).forEach((file) => {
        if (!file.type.match("image.*")) {
          alert("Hanya file gambar yang diizinkan.");
          this.value = "";
          uploadPreview.innerHTML = "";
          return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
          const previewItem = document.createElement("div");
          previewItem.className = "upload-preview-item";

          const img = document.createElement("img");
          img.src = e.target.result;
          img.alt = "Preview";

          const removeBtn = document.createElement("button");
          removeBtn.innerHTML = "&times;";
          removeBtn.addEventListener("click", function () {
            previewItem.remove();
          });

          previewItem.appendChild(img);
          previewItem.appendChild(removeBtn);
          uploadPreview.appendChild(previewItem);
        };

        reader.readAsDataURL(file);
      });
    });

    // Drag and Drop functionality
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
      uploadArea.style.backgroundColor = "rgba(26, 86, 167, 0.1)";
    }

    function unhighlight() {
      uploadArea.style.backgroundColor = "";
    }

    uploadArea.addEventListener("drop", handleDrop, false);

    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      fileInput.files = files;

      // Trigger change event manually
      const event = new Event("change");
      fileInput.dispatchEvent(event);
    }
  }

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Google Maps Integration
  function initMap() {
    // Replace with your actual coordinates
    const schoolLocation = { lat: 1.1717, lng: 124.8747 };

    const map = new google.maps.Map(document.getElementById("schoolMap"), {
      zoom: 15,
      center: schoolLocation,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              saturation: 36,
            },
            {
              color: "#333333",
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 17,
            },
            {
              weight: 1.2,
            },
          ],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#dedede",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 29,
            },
            {
              weight: 0.2,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#f2f2f2",
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#e9e9e9",
            },
            {
              lightness: 17,
            },
          ],
        },
      ],
    });

    const marker = new google.maps.Marker({
      position: schoolLocation,
      map: map,
      title: "SMKN 1 KAKAS",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "<h3>SMKN 1 KAKAS</h3><p>JL. RAYA WASIAN-KAKAS, PAHALETEN</p>",
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }

  // Initialize map if API is loaded
  if (typeof google !== "undefined") {
    initMap();
  } else {
    window.initMap = initMap;
  }

  // Form Submission
  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the data to a server
      // For demo purposes, we'll just show an alert
      alert(
        `Terima kasih, ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.`
      );

      // Reset form
      this.reset();
    });
  }

  const uploadForm = document.getElementById("uploadForm");
  if (uploadForm) {
    uploadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the files to a server
      // For demo purposes, we'll just show an alert
      alert("Foto fasilitas berhasil diupload!");

      // Reset form
      this.reset();
      uploadPreview.innerHTML = "";
    });
  }
});
