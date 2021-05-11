const ps = new PerfectScrollbar("#cells", {
	wheelSpeed: 12,
	wheelPropagation: true,
});

function findRowCol(ele) {
	let idArray = $(ele).attr("id").split("-");
	let rowId = parseInt(idArray[1]);
	let colId = parseInt(idArray[3]);
	return [rowId, colId];
}

for (let i = 1; i <= 100; i++) {
	let str = "";
	let n = i;

	while (n > 0) {
		let rem = n % 26;
		if (rem == 0) {
			str = "Z" + str;
			n = Math.floor(n / 26) - 1;
		} else {
			str = String.fromCharCode(rem - 1 + 65) + str;
			n = Math.floor(n / 26);
		}
	}
	$("#columns").append(`<div class="column-name">${str}</div>`);
	$("#rows").append(`<div class="row-name">${i}</div>`);
}

let cellData = {"Sheet1" : []};
let totalSheet = 1;
let selectedSheet = "Sheet1";

function loadNewSheet(){
	$("#cells").text("");
	for (let i = 1; i <= 100; i++) {
		let row = $(`<div class="cell-row"></div>`);
		let rowArray = [];
		for (let j = 1; j <= 100; j++) {
			row.append(
				`<div id="row-${i}-col-${j}" class="input-cell" contenteditable = "false"></div>`
			);
			rowArray.push({
				"font-family": "Noto Sans",
				"font-size": 14,
				"text": "",
				"bold": false,
				"italic": false,
				"underlined": false,
				"alignment": "left",
				"color": "#444",
				"bgcolor": "#fff",
			});
		}
		cellData[selectedSheet].push(rowArray);
		$("#cells").append(row);
	}
}

loadNewSheet();

$("#cells").scroll(function () {
	$("#columns").scrollLeft(this.scrollLeft);
	$("#rows").scrollTop(this.scrollTop);
});

$(".input-cell").dblclick(function () {
	$(this).attr("contenteditable", "true");
	$(this).focus();
});

$(".input-cell").blur(function () {
	$(this).attr("contenteditable", "false");
});

function getTopBottomLeftRightCell(rowId, colId) {
	let topCell = $(`#row-${rowId - 1}-col-${colId}`);
	let bottomCell = $(`#row-${rowId + 1}-col-${colId}`);
	let leftCell = $(`#row-${rowId}-col-${colId - 1}`);
	let rightCell = $(`#row-${rowId}-col-${colId + 1}`);

	return [topCell, bottomCell, leftCell, rightCell];
}

$(".input-cell").click(function (e) {
	$(".input-cell.selected").blur();
	let [rowId, colId] = findRowCol(this); // rowid takes 0th index && colid takes 1st index
	let [topCell, bottomCell, leftCell, rightCell] = getTopBottomLeftRightCell(
		rowId,
		colId
	);

	if ($(this).hasClass("selected") && e.ctrlKey) {
		unselectCell(this, e, topCell, bottomCell, leftCell, rightCell);
	} else {
		selectCell(this, e, topCell, bottomCell, leftCell, rightCell);
	}
});

function unselectCell(ele, e, topCell, bottomCell, leftCell, rightCell) {
	if ($(ele).attr("contenteditable") == "false") {
		if ($(ele).hasClass("top-selected")) {
			topCell.removeClass("bottom-selected");
		}
		if ($(ele).hasClass("left-selected")) {
			leftCell.removeClass("right-selected");
		}
		if ($(ele).hasClass("right-selected")) {
			rightCell.removeClass("left-selected");
		}
		if ($(ele).hasClass("bottom-selected")) {
			bottomCell.removeClass("top-selected");
		}

		$(ele).removeClass(
			"selected top-selected bottom-selected right-selected left-selected"
		);
	}
}

function selectCell(ele, e, topCell, bottomCell, leftCell, rightCell, mouseSelection) {
	if (e.ctrlKey || mouseSelection) {
		// top selected or not
		let topSelected;
		if (topCell) {
			topSelected = topCell.hasClass("selected");
		}
		// bottom selected or not
		let bottomSelected;
		if (bottomCell) {
			bottomSelected = bottomCell.hasClass("selected");
		}

		// left selected or not
		let leftSelected;
		if (leftCell) {
			leftSelected = leftCell.hasClass("selected");
		}

		// right selected or not
		let rightSelected;
		if (rightCell) {
			rightSelected = rightCell.hasClass("selected");
		}

		if (topSelected) {
			topCell.addClass("bottom-selected");
			$(ele).addClass("top-selected");
		}
		if (leftSelected) {
			leftCell.addClass("right-selected");
			$(ele).addClass("left-selected");
		}
		if (rightSelected) {
			rightCell.addClass("left-selected");
			$(ele).addClass("right-selected");
		}
		if (bottomSelected) {
			bottomCell.addClass("top-selected");
			$(ele).addClass("bottom-selected");
		}
	} else {
		$(".input-cell.selected").removeClass(
			"selected top-selected bottom-selected right-selected left-selected"
		);
	}

	$(ele).addClass("selected");
	changeHeader(findRowCol(ele));
}

function changeHeader([rowId, colId]) {
	let data = cellData[selectedSheet][rowId - 1][colId - 1];

	$("#font-family").val(data["font-family"]);
	$("#font-family").css("font-family", data["font-family"]);
	$("#font-size").val(data["font-size"]);
	$(".alignment.selected").removeClass("selected");
	$(`.alignment[data-type=${data.alignment}]`).addClass("selected");
	addRemoveSelectFromFontStyle(data, "bold");
	addRemoveSelectFromFontStyle(data, "italic");
	addRemoveSelectFromFontStyle(data, "underlined");

	$("fill-color-icon").css("border-bottom", `4px solid ${data.bgcolor}`);
	$("text-color-icon").css("border-bottom", `4px solid ${data.color}`);
}

function addRemoveSelectFromFontStyle(data, property) {
	if (data[property]) {
		$(`#${property}`).addClass("selected");
	} else {
		$(`#${property}`).removeClass("selected");
	}
}

let mousemoved = false;
let startCellStored = false;
let startCell;
let endCell;

$(".input-cell").mousemove(function (event) {
	event.preventDefault();
	if (event.buttons == 1 && !event.ctrlKey) {
		$(".input-cell.selected").removeClass(
			"selected top-selected bottom-selected right-selected left-selected"
		);
		// startCellStored = true; // this is bcz startcell stored multitimes
		mousemoved = true; // click krke move krte h to ise true kra
		// console.log(event.target, event.buttons);

		if (!startCellStored) {
			let [rowId, colId] = findRowCol(event.target);
			startCell = {
				rowId: rowId,
				colId: colId,
			};
			startCellStored = true;
		} else {
			let [rowId, colId] = findRowCol(event.target);
			endCell = {
				rowId: rowId,
				colId: colId,
			};
			selectAllBetweenTheRange(startCell, endCell);
		}
	} else if (event.buttons == 0 && mousemoved) {
		startCellStored = false; // for multiple times
		mousemoved = false;
		// console.log(event.target, event.buttons);
		// console.log(startCell, endCell);
	}
});

function selectAllBetweenTheRange(start, end) {
	// like (1,1) to (3,2)    //(i,j)
	// (start.rowId < end.rowId)..etc is used for selection in either directions
	for (let i = start.rowId < end.rowId ? start.rowId : end.rowId; i <= (start.rowId < end.rowId ? end.rowId : start.rowId); i++) {
		for (let j = start.colId < end.colId ? start.colId : end.colId; j <= (start.colId < end.colId ? end.colId : start.colId); j++) {
			let [topCell, bottomCell, leftCell, rightCell, ] = getTopBottomLeftRightCell(i, j);
			// `#row-${i}-col-${j}`[0] -->  current target element 0	th key pr element hota hai.
			selectCell($(`#row-${i}-col-${j}`)[0], {}, topCell, bottomCell, leftCell, rightCell, true);
		}
	}
}

$(".menu-selector").change(function () {
	let value = $(this).val();
	let key = $(this).attr("id");
	if (key == "font-family") {
		$("font-family").css(key, value);
	}
	if (!isNaN(value)) {
		value = parseInt(value);
	}
	// console.log(isNaN($(this).val()));

	$(".input-cell.selected").css(key, value);
	$(".input-cell.selected").each(function (index, data) {
		let [rowId, colId] = findRowCol(data);
		cellData[selectSheet][rowId - 1][colId - 1][key] = value;
	});
});

$(".alignment").click(function (e) {
	$(".alignment.selected").removeClass("selected");
	$(this).addClass("selected");
	let alignment = $(this).attr("data-type");
	$(".input-cell.selected").css("text-align", alignment);
	$(".input-cell.selected").each(function (index, data) {
		let [rowId, colId] = findRowCol(data);
		cellData[selectedSheet][rowId - 1][colId - 1].alignment = alignment;
	});
});

$("#bold").click(function (e) {
	setFontStyle(this, "bold", "font-weight", "bold");
});

$("#italic").click(function (e) {
	setFontStyle(this, "italic", "font-style", "italic");
});

$("#underlined").click(function (e) {
	setFontStyle(this, "underlined", "text-decoration", "underline");
});

function setFontStyle(ele, property, key, value) {
	if ($(ele).hasClass("selected")) {
		$(ele).removeClass("selected");
		$(".input-cell.selected").css(key, "");
		$(".input-cell.selected").each(function (index, data) {
			let [rowId, colId] = findRowCol(data);
			cellData[selectedSheet][rowId - 1][colId - 1][property] = false;
		});
	} else {
		$(ele).addClass("selected");
		$(".input-cell.selected").css(key, value);
		$(".input-cell.selected").each(function (index, data) {
			// .each is for loop
			// console.log(data);
			let [rowId, colId] = findRowCol(data);
			cellData[selectedSheet][rowId - 1][colId - 1][property] = true;
		});
	}
}

$(".color-pick").colorPick({

	'initialColor': "#TypeColor",
	'allowRecent': true,
	'recentMax': 5,
	'allowCustomColor': true,
	'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#ecf0f1", "#bdc3c7", "#95a5a6", "#7f8c8d"],
	'onColorSelected': function () {
		if (this.color != "#TypeColor") {
			// console.log(this.element);
			// console.log(this.color);
			// console.log(this.element.attr("id"));

			if (this.element.attr("id") == "fill-color") {
				$("#fill-color-icon").css("border-bottom", `4px solid ${this.color}`);
				$(".input-cell.selected").css("background-color", this.color);
				$(".input-cell.selected").each((index, data) => {
					let [rowId, colId] = findRowCOl(data);
					cellData[selectedSheet][rowId - 1][colId - 1].bgcolor = this.color;
				});
			} else {
				$("#text-color-icon").css("border-bottom", `4px solid ${this.color}`);
				$(".input-cell.selected").css("color", this.color);
				$(".input-cell.selected").each((index, data) => {
					let [rowId, colId] = findRowCOl(data);
					cellData[selectedSheet][rowId - 1][colId - 1].color = this.color;
				});
			}
		}
	}
});

$("#fill-color-icon, #text-color-icon").click(function (e) {
	setTimeout(() => {
		$(this).parent().click();
	}, 10);
});

$(".sheet-tab").click(function(e){
	selectSheet(this);
})

// to stop right click
$(".sheet-tab").bind("contextmenu",function(e){
	e.preventDefault();
	
	$(".sheet-options-modal").remove();
	let modal = $(`  <div class="sheet-options-modal">
						<div class="option sheet-rename">Rename</div>
						<div class="option sheet-delete">Delete</div>
					</div>`);
	$(".container").append(modal);
	$(".sheet-options-modal").css({"bottom" :0.04 * $(window).height(), "left" : e.pageX});
	$(".sheet-rename").click(function(e){
		
	})

});

function selectSheet(ele){
	$(".sheet-tab.selected").removeClass("selected");
	$(ele).addClass("selected");
}

$(".container").click(function(e){
	$(".sheet-options-modal").remove();
});

// $(".sheet-tab").blur(function(e) {
//     $(".sheet-tab").attr("contenteditable","false");
// });

// $(".sheet-tab.selected").focus(function(e){
//     $(this).text($(this).text())
// })

$(".sheet-tab").click(function(e){
	selectSheet(this);
})

$(".add-sheet").click(function(e){
	totalSheet++;
	
})