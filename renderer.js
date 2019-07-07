// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { BrowserWindow } = require("electron").remote;
const path = require("path");
const fs = require("fs");

let win3;

const btn = document.getElementById("btn1");
const textf1 = document.getElementById("index");

btn.addEventListener("click", function(e) {
  console.log("clicky");

  console.log(textf1.value);

  var index = textf1.value;
  var error = false;
  console.log(index.length);
  if (!index.length === 7) {
    error = true;
  }

  console.log(index.toString());
  //console.log()

  if (error) {
    console.log("error");
    window.alert("enter valid index");
    window.location.reload();
  } else {
    url = "https://doenets.lk/result/service/AlResult/" + index;

    fetch(url)
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);

        if (data.errMsge) {
          window.alert("error occured ,  index not found");
          window.location.reload();
        } else {
          var table = document.getElementById("myTable");

          var ress = data.studentInfo;
          var subj = data.subjectResults;
          var rrr;
          ress.forEach((element, id) => {
            var row = table.insertRow(id);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            // Add some text to the new cells:
            cell1.innerHTML = element.param;
            cell2.innerHTML = element.value;

            //rrr += element.param + "  " + element.value;
          });

          var table2 = document.getElementById("subjecys");

          console.log(subj);

          subj.forEach((element, id) => {
            var row = table2.insertRow(id);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            // Add some text to the new cells:
            cell1.innerHTML = element.subjectName;
            cell2.innerHTML = element.subjectResult;

            //rrr += element.subjectName + "  " + element.subjectResult;
          });

          //subjecys

          // Create an empty <tr> element and add it to the 1st position of the table:

          document.getElementById("para").innerHTML = rrr;
        }

        // Create and append the li's to the ul
      })
      .catch(err => {
        //window.alert("error occured ,  index not found");
        console.log(err);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

const btn2a = document.getElementById("btn2");
const textf12 = document.getElementById("indexlist");

btn2a.addEventListener("click", function(e) {
  console.log(textf12.value);

  var index = textf12.value;
  var error = false;
  console.log(index.length);
  if (index.length < 6) {
    error = true;
  }

  console.log(index.toString());
  //console.log()

  if (error) {
    console.log("error");
    window.alert("enter valid string");
  } else {
    var arr = index.split(",");
    console.log(arr);
    var index = arr.indexOf("");
    if (index > -1) {
      arr.splice(index, 1);
    }
    // arr = [2, 9]
    console.log(arr);

    // var resuss = [];
    // var textout = "";
    // arr.forEach(element => {
    //   url = "https://doenets.lk/result/service/AlResult/" + element;

    //   fetch(url)
    //     .then(resp => resp.json()) // Transform the data into json
    //     .then(function(data) {
    //       //var payload = { zscore: data.zScore, data: data };
    //       resuss.push(data);

    //       data.studentInfo.forEach(element => {
    //         console.log("jj");
    //         textout += element.param + "  " + element.value;
    //       });

    //       textout += "\n";
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // });

    getdata(arr);
    //console.log(resuss);

    function compare(a, b) {
      if (a.zscore < b.zscore) {
        return -1;
      }
      if (a.zscore > b.zscore) {
        return 1;
      }
      return 0;
    }

    //objs.sort( compare );

    // resuss.sort(function(a, b) {
    //   return a.zScore > b.zScore;
    // });

    // var textout = "";

    // resuss.forEach(eee => {
    //   console.log("gg");
    //   eee.studentInfo.forEach(element => {
    //     console.log("g");
    //     textout += element.param + "  " + element.value;
    //   });
    // });

    // setTimeout(() => {
    //   console.log(textout);
    // }, 1000);
    //fs.writeFileSync(pt, rrr);
  }
});

console.log("from one js");

function getdata(params) {
  //var resuss = [];
  var textout = "";
  params.forEach(element => {
    url = "https://doenets.lk/result/service/AlResult/" + element;

    fetch(url)
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        //var payload = { zscore: data.zScore, data: data };
        //resuss.push(data);

        data.studentInfo.forEach(element => {
          console.log("jj");
          textout += element.param + "  " + element.value + " ";
        });

        textout += "\n";
        var pt = path.join(__dirname, "results.txt");
        fs.appendFileSync(pt, textout);
        textout = "";
      })
      .catch(err => {
        console.log(err);
      });
  });
}
