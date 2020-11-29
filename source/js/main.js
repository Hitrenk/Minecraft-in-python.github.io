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

function data2issuesDetail(data, repo) {
	url = "https://github.com/" + repo + "/issues/" + data["number"];
	s = '<li>';
	s+= '<a href="' + url + '">' + data["title"] + "(#" + data["number"] + ")</a>";
	s+= ' by <a href="' + data["user"]["html_url"] + '">' + data["user"]["login"] + "</a></li>";
	return s;
}

function setArticleList(id) {
	api = "https://api.github.com/repos/Minecraft-in-python/Minecraft-in-python.github.io/contents/article";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (file of data) {
				$(id).prepend(data2articleDetail(file));
			}
		} else {
			$(id).prepend("<li>Github api error!</li>");
		}
	});
}

function setIssuesList(repo, id) {
	api = "https://api.github.com/repos/" + repo + "/issues";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (issues of data) {
				$(id).prepend(data2issuesDetail(issues, repo));
			}
		} else {
			$(id).prepend("<li>Github api error!</li>");
		}
	});
}
