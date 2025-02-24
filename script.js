function initSwiper(selector, initialDelay) {
  setTimeout(() => {
    new Swiper(selector, {
      effect: "cube",
      grabCursor: true,
      loop: true,
      autoplay: {
        delay: 3000, // Every cube rotates every 4 seconds
        disableOnInteraction: false,
      },
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }, initialDelay);
}

initSwiper(".mySwiper1", 0);     // Start immediately
initSwiper(".mySwiper2", 1000);  // Start after 1 sec
initSwiper(".mySwiper3", 2000);  // Start after 2 sec
initSwiper(".mySwiper4", 3000);  // Start after 3 sec
initSwiper(".mySwiper5", 4000);  // Start after 4 sec

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

// window.onload = function() {
//   setTimeout(function() {
//       document.getElementById("modal").classList.remove("hidden");
//       disableScroll();
//   }, 3000);
// };

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
  enableScroll();
});

// quiz

const quizzes = {
  info: [
    { question: "Do you want us to design an awesome logo and tagline for you?", points: 5 },
    { question: "Do you want us to write content for your website?", points: 7 },
    { question: "Do you want us to add 3 royalty free images to your website?", points: 7 },
    { question: "Do you want us to make social media posts for you?", type: "range", min: 0, max: 50, pointsPerUnit: 0 },
    { question: "Do you want us to make a business card for you?", points: 7 },
    { question: "Do you want us to make leaflets & brochures for you?", points: 7 }
  ],
  ecom: [
    { question: "Do you want us to design an awesome logo and tagline for you?", points: 5 },
    { question: "How are you going to provide us product information?", points: 5 },
    { question: "No of products you want to list on e-comm store?", points: 8 },
    { question: "Do you want G suit email for your business?", points: 0 },
    { question: "Will you add new products in future?", points: 0 },
    { question: "Do you want us to make social media posts for you?", points: 0 },
    { question: "Do want us to make business card for you  ?", points: 6 },
    { question: "Do want us to make leaflets & brouchers for you  ?", points: 6 },
  ],
  app: [
    { question: "Do you want real-time notifications?", points: 7 },
    { question: "Do you need user authentication?", points: 10 },
    { question: "Do you want in-app purchases?", points: 6 },
    { question: "Do you need analytics tracking?", points: 8 }
  ]
};

let score = 0;
const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    startQuiz(this.dataset.type, parseInt(this.dataset.baseScore));
  });
});

function startQuiz(type, baseScore) {
  score = baseScore; // Set base score
  scoreDisplay.textContent = `£${score}`;
  quizContainer.innerHTML = "";

  quizzes[type].forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("flex", "items-center", "justify-between", "mb-3", "p-10","border", "border-[#5283C2]", "rounded-[25px]", "bg-[#5283c22b]" ,"questionDiv" );

    let content = `
      <div class="flex-1">
        <p class="text-2xl text-[#5283C2]">${item.question}</p>
        ${
          item.question === "How are you going to provide us product information?"
            ? `<button class="manual-btn button-primary w-[200px] px-4 py-2 rounded mt-5" data-index="${index}" data-points="10">Product manual</button>
               <button class="excel-btn button-primary w-[200px] px-4 py-2 rounded mt-5 ml-2" data-index="${index}" data-points="5">Excel sheet</button>`
            : item.question === "No of products you want to list on e-comm store?"
            ? `<button class="product-50-btn button-primary w-fit px-4 py-2 rounded mt-5" data-index="${index}" data-points="0">Less than 50</button>
               <button class="product-100-btn button-primary w-fit px-4 py-2 rounded mt-5 ml-2" data-index="${index}" data-points="20">Around 250</button>
               <button class="product-250-btn button-primary w-fit px-4 py-2 rounded mt-5 ml-2" data-index="${index}" data-points="30">Around 500</button>
               <button class="product-500-btn button-primary w-fit px-4 py-2 rounded mt-5 ml-2" data-index="${index}" data-points="40">More than 1000</button>`
            : `<button class="yes-btn button-primary w-[100px] px-4 py-2 rounded mt-5" data-index="${index}" data-points="${item.points}">Yes</button>
               <button class="no-btn button-primary w-[100px] px-4 py-2 rounded mt-5 ml-2" data-index="${index}">No</button>`
        }
        ${item.question === "Do you want us to write content for your website?" ? 
        `<button class="detail-btn button-primary w-[100px] px-4 py-2 rounded my-5 ml-2">Detail</button>` : ""}
            <div class="w-[200px] text-right amount-cal hidden ">
             <p class="text-xl text-[#5283C2]">+ £ <span class="individual-score">0</span></p>
             <p class="text-xl font-bold text-[#5283C2]">Total: £ <span class="total-score">${score}</span></p>
            </div>
      </div>
     
    `;



    questionDiv.innerHTML = content;
    quizContainer.appendChild(questionDiv);
  });

  // const totalScoreDiv = document.createElement("div");
  // totalScoreDiv.classList.add("amount-cal", "w-[200px]", "text-right");
  // totalScoreDiv.innerHTML = `
  //   <p class="text-xl text-[#5283C2]">+ £ <span class="individual-score">0</span></p>
  //   <p class="text-xl font-bold text-[#5283C2]">Total: £ <span class="total-score">${score}</span></p>
  // `;
  // quizContainer.appendChild(totalScoreDiv);

  attachEventListeners();
}


function attachEventListeners() {
  document.querySelectorAll(".yes-btn, .no-btn, .manual-btn, .excel-btn, .product-50-btn, .product-100-btn, .product-250-btn, .product-500-btn").forEach(btn => {
    btn.addEventListener("click", function () {     
      const parent = this.closest(".flex");
      let points = parseInt(this.dataset.points) || 0;  // Default points from the button
      const isManual = this.classList.contains("manual-btn");
      const isExcel = this.classList.contains("excel-btn");

      const isYes = this.classList.contains("yes-btn");
      const isNo = this.classList.contains("no-btn");

      const isProduct50 = this.classList.contains("product-50-btn");
      const isProduct100 = this.classList.contains("product-100-btn");
      const isProduct250 = this.classList.contains("product-250-btn");
      const isProduct500 = this.classList.contains("product-500-btn");


      const scoreElement = parent.querySelector(".individual-score");
      const totalScoreElements = document.querySelectorAll(".total-score");
      const previousPoints = parseInt(scoreElement.textContent) || 0;

      // Reset all buttons in the row
      parent.querySelectorAll(".yes-btn, .no-btn, .manual-btn, .excel-btn, .product-50-btn, .product-100-btn, .product-250-btn, .product-500-btn").forEach(b => {
        b.classList.remove("button-secondary");
        b.classList.add("button-primary");
      });

      if (isManual) {
        points = 10; // Set points for Manual option
        score += points - previousPoints;  // Add points
        scoreElement.textContent = points;
      } else if (isExcel) {
        points = 5; // Set points for Excel option
        score += points - previousPoints;  // Add points
        scoreElement.textContent = points;
      } else if (isYes) {
        score += points - previousPoints;  // Add points for Yes
        scoreElement.textContent = points;

        // Check if it's the specific question about social media posts
        if (parent.querySelector('p').textContent === "Do you want us to make social media posts for you?" || 
    parent.querySelector('p').textContent === "Do you want G suit email for your business?" ||
    parent.querySelector('p').textContent === "Will you add new products in future?") {
  
  let pricePerPost = 0;
  let questionText = "";

  // Check the question and set the price accordingly
  if (parent.querySelector('p').textContent === "Do you want us to make social media posts for you?") {
    pricePerPost = 5; // £5 per post
    questionText = "£5 per post";
  } else if (parent.querySelector('p').textContent === "Do you want G suit email for your business?") {
    pricePerPost = 10.50; // £10.20 per post
    questionText = "£10.50 email id";
  } else if (parent.querySelector('p').textContent === "Will you add new products in future?") {
    pricePerPost = 1; // £10.20 per post
    questionText = "£1 per post";
  }

  // Create the div with input and button
  const priceDiv = document.createElement("div");
  priceDiv.classList.add("my-3", "text-[#5283C2]");
  priceDiv.innerHTML = `
    <p class="text-xl">${questionText}</p>
    <input type="number" class="number-posts border border-[#5283C2] text-[#5283C2] w-[100px] p-2 rounded-lg placeholder:text-[#5283C2]" placeholder="Enter number of posts">
    <button class="ok-btn button-primary w-[100px] px-4 py-2 rounded my-3">OK</button>
  `;
  
  const flex1Div = parent.querySelector(".questionDiv");
  parent.appendChild(priceDiv);
  // parent.insertBefore(priceDiv, flex1Div);

  const okButton = parent.querySelector(".ok-btn");
  okButton.addEventListener("click", function () {
    const numPosts = parseInt(parent.querySelector(".number-posts").value) || 0;
    const totalCost = numPosts * pricePerPost; // Use the correct price per post based on the question
    score += totalCost;
    scoreElement.textContent = totalCost.toFixed(2); // Display the cost with two decimal places
    totalScoreElements.forEach(el => el.textContent = `£${score.toFixed(2)}`); // Update total score
    scoreDisplay.textContent = `£${score.toFixed(2)}`;
    priceDiv.remove(); // Remove the input and button after calculation
  });
}
      }else if (isProduct50 || isProduct100 || isProduct250 || isProduct500) {
        score += points - previousPoints;
        scoreElement.textContent = points;
      } else {
        score -= previousPoints;  // Reset to 0 for No
        scoreElement.textContent = 0;
      }

      // Add 'button-primary' to selected button
      this.classList.remove("button-primary");
      this.classList.add("button-secondary");

      // Update all total score elements
      totalScoreElements.forEach(el => el.textContent = `£${score}`);
      scoreDisplay.textContent = `£${score}`;
    });
  });

  // Event listener for "Detail" button to open the modal
  document.querySelectorAll(".detail-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      // Create the modal
      const modal = document.createElement("div");
      modal.classList.add("modal", "fixed", "top-0", "left-0", "w-full", "h-full", "bg-gray-800", "bg-opacity-50", "flex", "items-center", "justify-center");
      
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content", "bg-white", "p-5", "rounded", "md:w-1/2", "w-[90%]");

      modalContent.innerHTML = `
        <h2 class="text-xl font-bold mb-4">Website Content Writing</h2>
        <p>We offer professional content writing services for your website. Our team will create engaging and SEO-friendly content that aligns with your brand and goals.</p>
        <button class="close-modal w-[100px] px-4 py-2 mt-5 rounded bg-[#5283C2] text-white">Close</button>
      `;
      
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Close the modal when the close button is clicked
      modal.querySelector(".close-modal").addEventListener("click", function () {
        modal.remove();
      });
    });
  });
}


document.querySelectorAll(".tab-btn").forEach(button => {
  button.addEventListener("click", function () {
      // Reset all buttons
      document.querySelectorAll(".tab-btn").forEach(btn => {
          btn.classList.remove("button-secondary");
          btn.classList.add("button-primary");
      });

      // Change only the clicked button to secondary
      this.classList.remove("button-primary");
      this.classList.add("button-secondary");

      // Start the quiz based on the selected type
      const type = this.dataset.type;
      const baseScore = parseInt(this.dataset.baseScore) || 0;
      startQuiz(type, baseScore);
  });
});

const monthlyBtn = document.getElementById('monthlyBtn');
        const yearlyBtn = document.getElementById('yearlyBtn');
        const monthly = document.getElementById('monthly');
        const yearly = document.getElementById('yearly');

        monthlyBtn.addEventListener('click', () => {
          monthly.classList.remove('hidden');
          yearly.classList.add('hidden');
          monthlyBtn.classList.remove('bg-gray-300', 'text-white');
          monthlyBtn.classList.add('bg-[#5283C2]','text-white');
          yearlyBtn.classList.remove('bg-[#5283C2]', 'text-white');
          yearlyBtn.classList.add('bg-gray-300', 'text-black');
        });

        yearlyBtn.addEventListener('click', () => {
            yearly.classList.remove('hidden');
            monthly.classList.add('hidden');
            yearlyBtn.classList.remove('bg-gray-300', 'text-white');
            yearlyBtn.classList.add('bg-[#5283C2]','text-white');
            monthlyBtn.classList.remove('bg-[#5283C2]', 'text-white');
            monthlyBtn.classList.add('bg-gray-300', 'text-black');
        });

        const openPlanModalBtn = document.querySelectorAll(".openPlanModalBtn");
        const closePlanModalBtn = document.getElementById("closePlanModalBtn");
        const modal = document.getElementById("planModal");
        const selectedPlanInput = document.getElementById("selectedPlan");
        const selectedPlanLabel = document.getElementById("selectedPlanLabel");


        openPlanModalBtn.forEach(button => {
          button.addEventListener("click", () => {
              const price = button.getAttribute("data-price");
              const plan = button.getAttribute("data-plan");
              const fullPlanDetails = `${price} - ${plan}`;

              // Update modal content
              // selectedPlanInput.value = fullPlanDetails;
              selectedPlanLabel.textContent = `Selected Plan: ${fullPlanDetails}`;

              // Show modal
              modal.classList.remove("hidden");
          });
      });


      //   openPlanModalBtn.addEventListener("click", () => {
      //     const priceDetails = document.getElementById("priceDetails").innerText.trim();
      //     const planName = document.getElementById("planName").innerText.trim();
      //     const fullPlanDetails = `${priceDetails} - ${planName}`;

      //     // Set dynamic values
      //     // selectedPlanInput.value = fullPlanDetails;
      //     selectedPlanLabel.textContent = `Selected Plan: ${fullPlanDetails}`;

      //     // Show modal
      //     modal.classList.remove("hidden");
      // });

      closePlanModalBtn.addEventListener("click", () => {
          modal.classList.add("hidden");
      });

      window.addEventListener("click", (e) => {
          if (e.target === modal) {
              modal.classList.add("hidden");
          }
      });

// function startQuiz(type, baseScore) {
//   score = baseScore;  // This will set the starting points when "Info Website" is selected
//   scoreDisplay.textContent = `£${score}`;
//   quizContainer.innerHTML = "";
//   quizzes[type].forEach((item, index) => {
//       const questionDiv = document.createElement("div");
//       questionDiv.classList.add("mb-3", "p-10", "bg-[#5283C2]", "rounded");
//       if (item.type === "range") {
//           questionDiv.innerHTML = `
//               <p class="text-2xl">${item.question} (5£ per post)</p>
//               <input type="range" min="${item.min}" max="${item.max}" value="1" class="range-input w-full mt-2" data-points="${item.pointsPerUnit}">
//               <span class="block mt-2">Selected: <span class="range-value">1</span></span>
//               <span class="block text-xl text-white">£ <span class="individual-score">${item.pointsPerUnit}</span></span>
//           `;
//       } else {
//           questionDiv.innerHTML = `
//               <p class="text-2xl">${item.question}</p>
//               <button class="yes-btn button-primary w-[200px]  px-4 py-2 rounded my-5" data-index="${index}" data-points="${item.points}">Yes</button>
//               <button class="no-btn button-primary w-[200px] px-4 py-2 rounded my-5 ml-2" data-index="${index}">No</button>
//               <span class="block text-xl text-white">£ <span class="individual-score">0</span></span>
//           `;
//       }
//       quizContainer.appendChild(questionDiv);
//   });
//   attachEventListeners();
// }

// function attachEventListeners() {
//   document.querySelectorAll(".yes-btn, .no-btn").forEach(btn => {
//     btn.addEventListener("click", function () {
//       const parent = this.parentElement;
//       const points = parseInt(this.dataset.points) || 0;
//       const isYes = this.classList.contains("yes-btn");
//       const scoreElement = parent.querySelector(".individual-score");
//       const previousPoints = parseInt(scoreElement.textContent);

//       if (isYes) {
       
//         score += points - previousPoints;
//         scoreElement.textContent = points;
//       } else {
//         score -= previousPoints;
//         scoreElement.textContent = 0;
//       }
//       scoreDisplay.textContent = score;
//     });
//   });

//   document.querySelectorAll(".range-input").forEach(input => {
//     input.addEventListener("input", function () {
//       const value = parseInt(this.value);
//       const pointsPerUnit = parseInt(this.dataset.points);
//       const totalPoints = value * pointsPerUnit;
//       this.nextElementSibling.querySelector(".range-value").textContent = value;
//       this.parentElement.querySelector(".individual-score").textContent = totalPoints;
//       score = Array.from(document.querySelectorAll(".individual-score"))
//         .reduce((sum, el) => sum + parseInt(el.textContent), 0);
//       scoreDisplay.textContent = score;
//     });
//   });
// }




