function changeSite() {
	if ((location.hostname.indexOf("gitee") != -1) & (location.hostname.indexOf("github") == -1)) {
		$("body").find("a").filter(":not(.no-transfer)").each(function (index, element) {
			$(element).attr("href", $(element).attr("href").replace("github.com", "gitee.com").replace("github.io", "gitee.io"));
		});
	}
}

function data2articleDetail(data) {
	url = `articles.html?${data["url"]}`;
	return `<li><a href="${url}">${data["name"]}</a></li>`;
}


function data2issuesDetail(data, repo) {
	url = `https://github.com/${repo}/issues/${data["number"]}`;
	s = "<div class='list-group-item list-group-item-action'>";
	s += `<h5 class='mb-1'><a href="${url}">${data["title"]}</a></h5>`;
	s += `<small><b class='text-primary'>#${data["number"]}</b> by <b><a href="${data["user"]["html_url"]}">${data["user"]["login"]}</a></b></small></div>`;
	return s;
}

function setPublicMembers(orgs, id, callback = function () {}) {
	api = `https://api.github.com/orgs/${orgs}/public_members`;
	$.get(api, function (data, status) {
		if (status == "success") {
			html = "";
			for (user of data) {
				html += `<li><a href="${user["html_url"]}">${user["login"]}</a></li>`;
			}
			$(id).append(html);
		} else {
			$(id).append("<li>Github api error!</li>");
		}
		callback();
	});
}

function getRecentCommit(repo, id) {
	api = `https://api.github.com/repos/${repo}/commits`;
	$.get(api, function (data, status) {
		if (status == "success") {
			commit = data[0];
			html = "";
			 if (location.hostname.indexOf("gitee") != -1) {
				if (repo.indexOf(".github.io") != -1) {
					repo = repo.slice(0, -10);
				}
				html = `<a href="https://gitee.com/${repo}/commit/${commit["sha"]}">${commit["commit"]["message"]}@${commit["sha"].slice(0, 7)}</a>`;
			} else {
				html = `<a href="${commit["html_url"]}">${commit["commit"]["message"]}@${commit["sha"].slice(0, 7)}</a>`;
			}
			$(id).html($(id).html().replace("%(commit)", html));
		} else {
			$(id).append("Recent commit: <p class='text-danger'>unknow</p>");
		}
	});
}

function setArticleList(id, callback = function () {}) {
	$.get("json/list.json", function (data, status) {
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

function setIssuesList(repo, id, callback = function () {}) {
	api = `https://api.github.com/repos/${repo}/issues`;
	$.get(api, function (data, status) {
		if (status == "success") {
			s = "<div class='list-group-item list-group-item-action'>"
			s += `<h5 class='mb-1'><a href='https://github.com/${repo}/issues/new'>Start new issue</a></h5></div>`;
			$(id).append(s);
			for (issues of data) {
				$(id).append(data2issuesDetail(issues, repo));
			}
		} else {
			$(id).append("<li>Github api error!</li>");
		}
		callback();
	});
}
