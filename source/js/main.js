function data2articleDetail(data) {
	url = "./articles.html?" + data["url"];
	s = '<li>';
	name = data["name"];
	s += '<a href="' + url + '">' + name + "</a></li>";
	return s;
}


function data2issuesDetail(data, repo) {
	url = "https://github.com/" + repo + "/issues/" + data["number"];
	s = "<a href='" + url + "' class='list-group-item list-group-item-action'>";
	s += "<p class='mb-1'>" + data["title"] + "</p>";
	s += "<small><b>#" + data["number"] + "</b> by <b>" + data["user"]["login"] + "</b></small></a>";
	return s;
}

function getRecentCommit(repo, id) {
	api = "https://api.github.com/repos/" + repo + "/commits";
	$.get(api, function(data, status) {
		if (status == "success") {
			commit = data[0];
			$(id).append("Recent commit: <a href='" + commit["html_url"] + "'>" + commit["commit"]["message"] + " @ " + commit["sha"].slice(0, 7)) + "</a>";
		} else {
			$(id).append("Recent commit: unknow");
		}
	});
}

function setArticleList(id, callback=function() {}) {
	url = "article/list.json";
	$.get(url, function(data, status) {
		if (status == "success") {
			for (file of data) {
				$(id).append(data2articleDetail(file));
			}
		} else {
			$(id).append("<li>URL not found!</li>");
		}
		callback();
	});
}

function setIssuesList(repo, id, callback=function() {}) {
	api = "https://api.github.com/repos/" + repo + "/issues";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (issues of data) {
				$(id).append(data2issuesDetail(issues, repo));
			}
		} else {
			$(id).append("<li>Github api error!</li>");
		}
		callback();
	});
}
