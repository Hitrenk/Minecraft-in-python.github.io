var count = -1;

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

function data2docsDetail(type, id, name, extra="") {
	if (type == "file") {
		url = "./docs-tmp.html?" + name;
		s = '<li id="'+ id + '">';
		s += '<a href="' + url + "</a></li>";
		return s;
	} else {
		s = "<li>" + name + "<ul>" + extra  + "</ul></li>";
		return s;
	}
}

function data2issuesDetail(data, repo) {
	url = "https://github.com/" + repo + "/issues/" + data["number"];
	s = '<li>';
	s+= '<a href="' + url + '">' + data["title"] + "(#" + data["number"] + ")</a>";
	s+= ' by <a href="' + data["user"]["html_url"] + '">' + data["user"]["login"] + "</a></li>";
	return s;
}

function getDocs(path, id, callback=function() {}) {
	api = "https://api.github.com/repos/Minecraft-in-python/Minecraft-in-python.github.io/contents/docs" + path;
	$.get(api, function(data, status) {
		if (status == "success") {
			for (file of data) {
				++ count;
				if (file["type"] == "file") {
					$(id).append(data2docsDetail("file", count, data["name"]));
				} else {
					if (path == "") {
						getDocs(data["name"], count);
					} else {
						getDocs(path + "/" + data["name"], count);
					}
				}
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
