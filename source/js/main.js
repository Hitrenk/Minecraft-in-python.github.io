function data2articleDetail(data) {
	url = "./article-tmp.html?" + data["name"];
	s = '<li>';
	name = data["name"].slice(0, -5);
	while (name.indexOf("-") != -1) {
		name = name.replace("-", " ");
	}
	s += '<a href="' + url + '">' + name + "</a></li>";
	return s;
}

function data2docsDetail(data) {
	url = "./docs-tmp.html?" + data["name"];
	s = '<li>';
	name = data["name"].slice(0, -3);
	while (name.indexOf("-") != -1) {
		name = name.replace("-", " ");
	}
	s += '<a href="' + url + '">' + name + "</a></li>";
	return s;
}

function data2issuesDetail(data, repo) {
	url = "https://github.com/" + repo + "/issues/" + data["number"];
	s = '<li>';
	s+= '<a href="' + url + '">' + data["title"] + "(#" + data["number"] + ")</a>";
	s+= ' by <a href="' + data["user"]["html_url"] + '">' + data["user"]["login"] + "</a></li>";
	return s;
}

function getDocs(id, callback=function() {}) {
	api = "https://api.github.com/repos/Minecraft-in-python/Minecraft-in-python.github.io/contents/docs";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (file of data) {
				$(id).append(data2docsDetail(data));
			}
			callback();
		} else {
			$(id).append("<li>Github api error!</li>");
		}
	});
}

function getRecentCommit(repo, id) {
	api = "https://api.github.com/repos/" + repo + "/commits";
	$.get(api, function(data, status) {
		if (status == "success") {
			commit = data[0];
			$(id).append("Commit: " + commit["commit"]["message"] + " @ " + commit["sha"].slice(0, 7));
		} else {
			$(id).append("Commit: unknow");
		}
	});
}

function setArticleList(id, callback=function() {}) {
	api = "https://api.github.com/repos/Minecraft-in-python/Minecraft-in-python.github.io/contents/article";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (file of data) {
				$(id).append(data2articleDetail(file));
			}
			callback();
		} else {
			$(id).append("<li>Github api error!</li>");
		}
	});
}

function setIssuesList(repo, id, callback=function() {}) {
	api = "https://api.github.com/repos/" + repo + "/issues";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (issues of data) {
				$(id).append(data2issuesDetail(issues, repo));
			}
			callback();
		} else {
			$(id).append("<li>Github api error!</li>");
		}
	});
}
