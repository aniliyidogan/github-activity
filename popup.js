chrome.tabs.getSelected(null,function(tab) {

  var tablink = tab.url.split('/');
  if (tablink[tablink.length - 1] === "") tablink.pop(); // url sonunda '/' olma durumu
  if (tablink[tablink.length - 2] === "github.com"){


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/" + tablink[tablink.length-1] + "/events", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {

        var colors = {"Watch": "#ffeb3b", "Push": "#4caf50", "PullRequest": "#03a9f4", "PullRequestReviewComment": "#0288d1",
                    "IssueComment": "#d32f2f", "Issues": "#f44336", "Create": "#ff5722", "Fork": "#9c27b0"}

        data = JSON.parse(xhr.responseText)
        document.getElementById("username").innerText = data[0]['actor']['login']

        div = document.getElementById("repo");

        for(i = 0; i < 30; i++){
          var type = data[i]['type'].split("Event")[0]
          var apiLink = data[i]['repo']['url'].split('/');
          var link = "https://github.com/" + apiLink[4] + "/" + apiLink[5]

          div.insertAdjacentHTML('beforeend',
                                  "<div class='chip' style='background-color:"
                                  + colors[type]
                                  + "'>"
                                  + type
                                  + "</div>")
          div.insertAdjacentHTML('beforeend',
                                "<a href='"
                                + link
                                + "' target='_blank'>"
                                + "<span id='repo-name'>"
                                + data[i]['repo']['name']
                                + "</span>"
                                + "</a>"
                                + "<br>")

        }
      }
    }
  } // farklı bir sayfada istek atma durumu
  else {
    document.getElementById("username").innerText = "Not here in the github.com/:username"
  }
  xhr.send();
})
