function data2articleDetail(data) {
	url = "./articles.html?" + data["url"];
	s = '<li>';
	name = data["name"];
	s += '<a href="' + url + '">' + name + "</a></li>";
	return s;
}


function data2issuesDetail(data, repo) {
	url = "https://github.com/" + repo + "/issues/" + data["number"];
	s = "<div class='list-group-item list-group-item-action'>";
	s += "<h5 class='mb-1'><a class='link-dark' href='" + url + "'>" + data["title"] + "</a></h5>";
	s += "<small><b class='text-primary'>#" + data["number"] + "</b> by <b><a class='link-dark' href='" + data["user"]["html_url"] +"'>" + data["user"]["login"] + "</a></b></small></div>";
	return s;
}

function setPublicMembers(orgs, id, callback=function() {}) {
	api = "https://api.github.com/orgs/" + orgs + "/public_members";
	$.get(api, function(data, status) {
		if (status == "success") {
			html = "";
			for (user of data) {
				html += "<li><a href='" + user["html_url"] + "'>" + user["login"] + "</a></li>";
			}
			$(id).append(html);
		} else {
			$(id).append("<li>Github api error!</li>");
		}
		callback();
	});
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
