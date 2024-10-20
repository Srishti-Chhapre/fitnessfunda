// Functionality for underline movement
const underline = document.querySelector(".underline");
const navbarItems = document.querySelectorAll("#navbarList li");

navbarItems.forEach(item => {
  item.addEventListener("click", () => {
    underline.style.top = `${item.offsetTop + item.offsetHeight}px`;
    underline.style.left = `${item.offsetLeft}px`;
    underline.style.width = `${item.offsetWidth}px`;
  });
});

window.addEventListener("load", () => {
  const homeItem = navbarItems[0];
  underline.style.top = `${homeItem.offsetTop + homeItem.offsetHeight}px`;
  underline.style.left = `${homeItem.offsetLeft}px`;
  underline.style.width = `${homeItem.offsetWidth}px`;
});

// Video play functionality
function playVideo() {
  const video = document.getElementById("live-video");
  document.querySelector(".thumbnail").style.display = "none";
  document.querySelector(".play-icon").style.display = "none";
  video.style.display = "block";
  video.play();
}

// Toggle answer functionality for FAQ
let currentOpenAnswer = null;

window.toggleAnswer = function (element) {
  const answer = element.nextElementSibling;
  const plusIcon = element.querySelector(".plus-icon");
  const minusIcon = element.querySelector(".minus-icon");

  if (answer.classList.contains("open")) {
    closeAnswer(answer, element, plusIcon, minusIcon);
  } else {
    openAnswer(answer, element, plusIcon, minusIcon);
  }
};

function closeAnswer(answer, element, plusIcon, minusIcon) {
  answer.style.maxHeight = 0;
  answer.style.opacity = 0;
  answer.classList.remove("open");
  element.classList.remove("active");
  plusIcon.style.display = "inline";
  minusIcon.style.display = "none";
}

function openAnswer(answer, element, plusIcon, minusIcon) {
  if (currentOpenAnswer && currentOpenAnswer !== answer) {
    const currentPlusIcon = currentOpenAnswer.previousElementSibling.querySelector(".plus-icon");
    const currentMinusIcon = currentOpenAnswer.previousElementSibling.querySelector(".minus-icon");
    closeAnswer(currentOpenAnswer, currentOpenAnswer.previousElementSibling, currentPlusIcon, currentMinusIcon);
  }

  answer.style.maxHeight = `${answer.scrollHeight}px`;
  answer.style.opacity = 1;
  answer.classList.add("open");
  element.classList.add("active");
  plusIcon.style.display = "none";
  minusIcon.style.display = "inline";
  currentOpenAnswer = answer;
}

// GSAP animations for containers
const gsapAnimations = [
  { trigger: ".thirdContainer", element: ".benefits-section h2", y: 30, duration: 0.5 },
  { trigger: ".fourthContainer", element: ".schedule-section h1", y: 30, duration: 0.5 },
  { trigger: ".fifthContainer", elements: [".fifthContainer h1", ".fifthContainer h3"], y: 30, duration: 0.5 },
  { trigger: ".sixthContainer", element: ".sixthContainerContent h1", y: 30, duration: 0.5 },
  { trigger: ".seventhContainer", element: ".seventhContainer h1", y: 30, duration: 0.5 },
  { trigger: ".eighthContainer", element: ".eighthContainer h1", y: 30, duration: 0.5 },
];

gsapAnimations.forEach(animation => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: animation.trigger,
      scroll: "body",
      start: "top 100%",
      toggleActions: "play none none reverse",
    },
  });

  if (animation.elements) {
    animation.elements.forEach(el => {
      tl.from(el, { opacity: 0, y: animation.y, duration: animation.duration });
    });
  } else {
    tl.from(animation.element, { opacity: 0, y: animation.y, duration: animation.duration });
  }
});

// Hover animations for images using GSAP
document.querySelectorAll(".benefit-card img").forEach(img => {
  let hoverAnimation;

  img.addEventListener("mouseenter", () => {
    hoverAnimation = gsap.to(img, { scale: 1.1, duration: 0.4, yoyo: true, repeat: -1, ease: "power1.inOut" });
  });

  img.addEventListener("mouseleave", () => {
    hoverAnimation.kill();
    gsap.to(img, { scale: 1, duration: 0.5 });
  });
});

// Hover animations for buttons using GSAP
document.querySelectorAll(".registerButtonText").forEach(span => {
  let hoverButtonAnimation;

  span.addEventListener("mouseenter", () => {
    hoverButtonAnimation = gsap.to(span, { scale: 1.1, duration: 0.5, yoyo: true, repeat: -1, ease: "power1.inOut" });
  });

  span.addEventListener("mouseleave", () => {
    hoverButtonAnimation.kill();
    gsap.to(span, { scale: 1, duration: 0.5 });
  });
});

// Hamburger menu toggle functionality
// document.getElementById("hamburgerMenu").addEventListener("click", function() {
//   const hamburgerIcon = document.getElementById("hamburgerIcon");
//   const crossIcon = document.getElementById("crossIcon");
//   const dropdownContainer = document.getElementById("dropdownContainer");

//   if (hamburgerIcon.style.display !== 'none') {
//     hamburgerIcon.style.display = 'none';
//     crossIcon.style.display = 'block';
//     dropdownContainer.style.display = 'block';
//   } else {
//     hamburgerIcon.style.display = 'block';
//     crossIcon.style.display = 'none';
//     dropdownContainer.style.display = 'none';
//   }
// });

// Dropdown <li> click functionality
document.querySelectorAll("#dropdown li").forEach(item => {
  item.addEventListener("click", function() {
    document.querySelectorAll("#dropdown li").forEach(li => li.classList.remove("active"));
    this.classList.add("active");
  });
});

// window.addEventListener('load', () => {
//   gsap.fromTo(".myImage", 
//     { scale: 0, transformOrigin: "top left"}, // Start scale
//     { scale: 1, duration: 0.7, ease: "power2.out" } // End scale with animation
//   );
// });
window.addEventListener('load', () => {
  gsap.fromTo(".myImage", 
    { scale: 0, right: "-50%" }, // Start with scale 0 and positioned off-screen to the right
    { 
      scale: 1, // Scale to full size
      right: "0%", // Move to full position
      duration: 2, // Animation duration
      ease: "power2.out" // Easing effect
    }
  );
});


const containerDiv = document.getElementById('dropdownContainer');
const toggleButton = document.getElementById('hamburgerMenu');
const crossIcon = document.getElementById('crossIcon');
const hamburgerIcon = document.getElementById('hamburgerIcon');
let isOpen = false;

toggleButton.addEventListener('click', () => {
    if (!isOpen) {
        containerDiv.style.display = "block"; // Show the dropdown before animating
        gsap.to(containerDiv, { 
            transform: "translateY(0) scaleY(1)", // Open from the top
            duration: 0.3, 
            ease: "power2.out" 
        });
        hamburgerIcon.style.display = "none"; // Hide hamburger icon
        crossIcon.style.display = "block"; // Show close icon
    } else {
        closeDropdown();
    }
    isOpen = !isOpen;
});

// Close dropdown function
crossIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from bubbling up to the toggleButton
    closeDropdown();
});

function closeDropdown() {
    gsap.to(containerDiv, { 
        transform: "translateY(-100%) scaleY(0)", // Close to the top
        duration: 0.3, 
        ease: "power2.in", 
        onComplete: () => {
            containerDiv.style.display = "none"; // Hide the dropdown after animation
            hamburgerIcon.style.display = "block"; // Show hamburger icon
            crossIcon.style.display = "none"; // Hide close icon
        }
    });
}





























