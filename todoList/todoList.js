/**
 * Datepicker는 국내와 표기 순서가 다르기 때문에
 * 한국어로 변환하는 과정이 필요하다.
 */
$.datepicker.setDefaults({
  dateFormat: "yy-mm-dd",
  prevText: "이전 달",
  nextText: "다음 달",
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
  showMonthAfterYear: true,
  yearSuffix: "년",
  minDate: 0,
});

$(function () {
  $(".datepicker").datepicker();
});

// CheckBox
allCheck = (e) => {
  // 전체 체크 버튼 클릭시 전체 체크 및 해제
  if (e.target.checked) {
    document.querySelectorAll(".check_all_list").forEach(function (v) {
      v.checked = true;
    });
  } else {
    document.querySelectorAll(".check_all_list").forEach(function (v) {
      v.checked = false;
    });
  }
};

checkAllList = () => {
  // 체크 버튼 클릭시 전체 체크 버튼 체크 및 해제
  let checkCount = 0;
  document.querySelectorAll(".check_all_list").forEach(function (v) {
    if (v.checked === false) {
      checkCount++;
    }
  });

  if (checkCount > 0) {
    document.getElementById("allCheck").checked = false;
  } else if (checkCount === 0) {
    document.getElementById("allCheck").checked = true;
  }
};

/**
 * 데이터 추가
 */
addData = () => {
  let objTodo = {
    rowId: document.getElementById("table-body").childElementCount,
    date: document.getElementById("date").value,
    content: document.getElementById("content").value,
  };

  if (objTodo.date == "") {
    alert("날짜를 선택하세요.");
    return;
  }

  if (objTodo.content == "") {
    alert("내용을 입력하세요.");
    return;
  }

  appendRow(objTodo);
  setIndexTable();

  // 입력폼 초기화
  document.getElementById("date").value = "";
  document.getElementById("content").value = "";
};

/**
 * 단건 삭제
 */
deleteData = (id) => {
  let arrOldData = getAllData();
  let arrNewData = [];

  arrOldData.forEach((item, index) => {
    if (item.rowId != id) {
      item.rowId = index;
      arrNewData.push(item);
    }
  });
  document.getElementById("table-body").innerHTML = "";

  for (let item of arrNewData) {
    appendRow(item);
  }
  setIndexTable();
};

/**
 * 다중 삭제
 */
deleteSelectedData = () => {
  if ($("input:checkbox[name='checkRow']:checked").length == 0) {
    alert("선택된 항목이 없습니다.");
    return;
  }

  let iRowCount = document.getElementById("table-body").childElementCount;
  let arrNewData = [];
  let index = 0;

  for (let i = 0; i < iRowCount; i++) {
    if (document.getElementById("checkbox-" + i).checked != true) {
      let objTodo = {
        rowId: index,
        date: document.getElementById("date-" + i).textContent,
        content: document.getElementById("content-" + i).textContent,
        completeState: document.getElementById("complete-" + i).checked,
      };
      arrNewData.push(objTodo);
      index++;
    }
  }

  document.getElementById("table-body").innerHTML = "";

  for (let item of arrNewData) {
    appendRow(item);
  }

  setIndexTable();
  $("input:checkbox[name='allCheck']").prop("checked", false);
};

/**
 * 단건 수정
 */
updateData = () => {
  let iRowId = document.getElementById("table-id").value;
  let strNewContent = document.getElementById("after-update-text").value;

  if (strNewContent == "") {
    alert("수정하실 문자열을 입력하세요.");
    return;
  }

  document.getElementById("content-" + iRowId).textContent = strNewContent;

  // 모달창 닫기
  document.getElementById("close-update-modal").click();
};

/**
 * 일괄 수정
 */
updateDataAll = () => {
  let arrTodoList = getAllData();
  let strBeforeContent = document.getElementById("before-update-text").value;
  let strAfterContent = document.getElementById("after-update-text").value;

  let isUpdated = false;

  if (strAfterContent == "" || strBeforeContent == "") {
    alert("텍스트를 입력하세요.");
    return;
  }

  for (let item of arrTodoList) {
    let strOldContent = item.content;
    let strNewContent = "";

    if (strOldContent.indexOf(strBeforeContent) != -1) {
      let arry = strOldContent.split(strBeforeContent);
      for (let i = 0; i < arry.length; i++) {
        strNewContent += arry[i];
        if (i != arry.length - 1) {
          strNewContent += strAfterContent;
          isUpdated = true;
        }
      }
      item.content = strNewContent;
    }
  }

  if (!isUpdated) {
    alert("찾으시는 문자열이 없습니다.");
    return;
  }

  for (let item of arrTodoList) {
    document.getElementById("content-" + item.rowId).textContent = item.content;
  }

  // 모달창 닫기
  document.getElementById("close-update-modal").click();
};

/**
 * 데이터 반환
 */
getAllData = () => {
  let data = [];
  let tableCount = document.getElementById("table-body").childElementCount;

  if (tableCount == 0) {
    alert("저장된 항목이 없습니다.");
    return;
  }
  for (let i = 0; i < tableCount; i++) {
    let id = document
      .getElementById("table-body")
      .getElementsByTagName("tr")
      [i].getAttribute("rowId");

    let rowData = {
      rowId: id,
      date: document.getElementById("date-" + id).textContent,
      content: document.getElementById("content-" + id).textContent,
      completeState: document.getElementById("complete-" + id).checked,
    };

    data.push(rowData);
  }
  return data;
};

/**
 * 데이터 JSON 형식으로 반환
 */
showJsonData = () => {
  let arrTodoList = getAllData();
  let iRowCount = arrTodoList.length;

  if (iRowCount == 0) {
    alert("저장된 데이터가 없습니다.");
    return;
  }

  alert(JSON.stringify(arrTodoList));
};

/**
 * JSON 파일 호출
 */
getJsonFile = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/todo.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        alert("Fail");
        reject(error);
      },
    });
  });
};

promiseThen = () => {
  getJsonFile()
    .then((data) => {
      // rowId 세팅
      let iRowCount = document.getElementById("table-body").childElementCount;

      for (let item of data) {
        let rowData = {
          rowId: iRowCount++,
          date: item.date,
          content: item.content,
          completeState: item.completeState,
        };
        appendRow(rowData);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

setIndexTable = () => {
  // debugger;
  // let arrRow = document.getElementById("table-body").getElementsByTagName("tr");

  // arrRow.forEach((v, i) => {
  //   v.setAttribute("id", "tr-" + i);
  //   v.setAttribute("rowId", i);
  //   v.children[1].setAttribute("id", "date-" + i);
  //   v.children[2].setAttribute("id", "content-" + i);
  // });

  // TODO 자바스크립트로 바꾸기
  $("#table-body")
    .find("tr")
    .each(function (i, v) {
      v.setAttribute("id", "tr-" + i);
      v.setAttribute("rowId", i);
      v.children[1].setAttribute("id", "date-" + i);
      v.children[2].setAttribute("id", "content-" + i);
    });
};

/**
 * 테이블 행 추가
 */
appendRow = (rowData) => {
  let addHtml = `<tr id="tr-${rowData.rowId}" rowId="${rowData.rowId}">
            <td>
              <input
                type="checkbox"
                name="checkRow"
                id="checkbox-${rowData.rowId}"
                class="check_all_list"
                onclick="checkAllList(event)"
              />
            </td>
            <td id="date-${rowData.rowId}" name="date">${rowData.date}</td>
            <td id="content-${rowData.rowId}" name="content">${
    rowData.content
  }</td>
            <td><input
                type="checkbox"
                name="checkComplete"
                id="complete-${rowData.rowId}"
              ${
                rowData.completeState == true ? "checked" : ""
              } onclick="checkComplete(${rowData.rowId})" /></td>
            <td><span style="color: red; cursor:pointer;" onclick="javascript:deleteData(${
              rowData.rowId
            });">삭제</span>&nbsp;&nbsp;
          <span style="color: blue; cursor:pointer;" data-toggle="modal" data-target="#update-modal" onclick="clickUpdateBtn(${
            rowData.rowId
          })">
    수정
  </span></td>
          </tr>`;
  document.getElementById("table-body").innerHTML += addHtml;
};

/**
 * 단건 수정폼 세팅
 */
clickUpdateBtn = (id) => {
  initUpdateForm();

  let strContent = document.getElementById("content-" + id).textContent;

  document.getElementById("update-btn").style.display = "block";
  document.getElementById("update-all-btn").style.display = "none";
  document.getElementById("before-update-text").value = strContent;
  document.getElementById("before-update-text").disabled = true;
  document.getElementById("table-id").value = id;
};

/**
 * 일괄 수정폼 세팅
 */
clickUpdateAllbtn = () => {
  initUpdateForm();

  document.getElementById("before-update-text").disabled = false;
  document.getElementById("update-all-btn").style.display = "block";
  document.getElementById("update-btn").style.display = "none";
};

/**
 * 수정폼 초기화
 */
initUpdateForm = () => {
  document.getElementById("before-update-text").value = "";
  document.getElementById("after-update-text").value = "";
};

/**
 * 초기화
 */
initData = () => {
  document.getElementById("table-body").innerHTML = "";
};

checkComplete = (id) => {
  document.getElementById("complete-" + id).setAttribute("checked", true);
};

// 검색기능 - alert
// 완료여부 색깔 바뀌게
// filter, map
// 변수명 수정
