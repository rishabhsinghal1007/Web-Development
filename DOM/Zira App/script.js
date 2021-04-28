let TC = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
let modalVisible = false;
for (let i = 0; i < allFilters.length; i++) {
   allFilters[i].addEventListener("click", filterHandler);
}

function filterHandler(e) {}
let addBtn = document.querySelector(".add");

addBtn.addEventListener("click", showModal);
let selectedPrority;
function showModal(e) {
   if (!modalVisible) {
      // let modal = document.createElement("div");
      // modal.classList.add("modal");
      // modal.innerHTML = `<div class="task-to-be-added" data-typed="false" contenteditable="true"></div>
      //   <div class="modal-priority-list">
      //       <div class="modal-pink-filter modal-filter"></div>
      //       <div class="modal-blue-filter modal-filter"></div>
      //       <div class="modal-green-filter  modal-filter"></div>
      //       <div class="modal-yellow-filter  modal-filter"></div>
      //   </div>`;
      // TC.appendChild(modal);

      let modal = `<div class="modal">
         <div class="task-to-be-added" data-typed="false" contenteditable="true">Enter Your Task Here</div>
         <div class="modal-priority-list">
            <div class="modal-pink-filter modal-filter active"></div>
            <div class="modal-green-filter modal-filter"></div>
            <div class="modal-blue-filter modal-filter"></div>
            <div class="modal-bisque-color-filter modal-filter"></div>
         </div>
      </div>`;
      TC.innerHTML = TC.innerHTML + modal;
      selectedPriority = "pink";

      let taskModal = document.querySelector(".task-to-be-added");
      taskModal.addEventListener("click", function (e) {
         if (e.currentTarget.getAttribute("data-typed") == "false") {
            e.currentTarget.innerText = "";
            e.currentTarget.setAttribute("data-typed", "true");
         }
      });
      modalVisible = true;
      taskModal.addEventListener("keypress", addTicket.bind(this, taskModal));
      let modalFilters = document.querySelectorAll(".modal-filter");
      for (let i = 0; i < modalFilters.length; i++) {
         modalFilters[i].addEventListener(
            "click",
            selectPriority.bind(this, taskModal)
         );
      }
   }
}

function selectPriority(taskModal, e) {
   let activeFilter = document.querySelector(".modal-filter.active");
   activeFilter.classList.remove("active");
   selectedPriority = e.currentTarget.classList[0].split("-")[1];
   e.currentTarget.classList.add("active");
   taskModal.click();
   taskModal.focus();
}

function addTicket(taskModal, e) {
   if (
      e.key == "Enter" &&
      e.shiftKey == false &&
      taskModal.innerText.trim() != ""
   ) {
      let task = taskModal.innerText;

      let ticket = ` <div class="ticket">
                        <div class="ticket-color ticket-color-${selectedPriority}"></div>
                        <div class="ticket-id">#123</div>
                        <div class="task">${task}</div>
                     </div>`;

      document.querySelector(".modal").remove();
      modalVisible = false;
      TC.innerHTML = TC.innerHTML + ticket;
   } else if (e.key == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      alert("Error! you have not type anything in task");
   }
}
