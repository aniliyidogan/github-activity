chrome.tabs.getSelected(null,function(tab) {

  var tablink = tab.url.split('/');
  if (tablink[tablink.length - 1] === "") tablink.pop(); // url sonunda '/' olma durumu
  if (tablink[tablink.length - 2] != "github.com") return; // farklı bir sayfada istek atma durumu

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.github.com/users/" + tablink[tablink.length-1] + "/events", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {

      var color = {"Watch": "#ffeb3b", "Push": "#4caf50", "PullRequest": "#03a9f4", "PullRequestReviewComment": "#0288d1",
                  "IssueComment": "#d32f2f", "Issues": "#f44336", "Create": "#ff5722", "Fork": "#9c27b0"}

      data = JSON.parse(xhr.responseText)

      document.getElementById("username").innerText = data[0]['actor']['login']
      document.getElementById("avatar").src = data[0]['actor']['avatar_url']
      document.getElementById("avatar").style = "width:60px;height:60px;border-radius:5px;"

      div = document.getElementById("repo");

      for(i = 0; i < 30; i++){
        var type = data[i]['type'].split("Event")[0]

        div.insertAdjacentHTML('beforeend',
                                "<div class='chip' style='background-color:"
                                + color[type]
                                + "'>"
                                + type
                                + "</div>")
        div.insertAdjacentHTML('beforeend',
                              "<span style='font-size:16px'>"
                              + data[i]['repo']['name']
                              + "</span>"
                              + "<br>")

      }
    }
  }
  xhr.send();
})
