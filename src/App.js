import React, { useState } from "react";
import { Octokit } from "octokit";
import Repositories from "./components/pages/Repositories";
import Commits from "./components/pages/Commits";
import Landing from "./components/pages/Landing";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_API_KEY,
});

const App = () => {
  const [repositoryData, setRepositoryData] = useState([]);
  const [commitData, setCommitData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRepo, setCurrentRepo] = useState("")

  const getOrganizationRepos = async function (org) {
    await octokit
      .request(`GET /orgs/${org}/repos`, {
        org: org,
        sort: "updated",
        direction: "desc",
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        let repoData = [];
        for (let i in data) {
          repoData.push({
            name: data[i].name,
            language: data[i].language,
            description: data[i].description,
            stars: data[i].stargazers_count,
            forks: data[i].forks,
            createdDate: data[i].created_at,
          });
        }
        setRepositoryData(repoData);
      });
  };

  const getRepositoryCommits = async function (org, repo) {
    await octokit
      .request(`GET /repos/${org}/${repo}/commits`, {
        org: org,
        repo: repo,
        per_page: 10,
      })
      .then((response) => {
        setCurrentRepo(repo)
        return response.data;
      })
      .then((data) => {
        let commitData = [];
        for (let i in data) {
          commitData.push({
            author: data[i].committer.login,
            title: data[i].commit.message,
            hash: data[i].sha,
            createdAt: data[i].commit.committer.date,
          });
        }
        setCommitData(commitData);
        
      });
  };
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <Landing
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getOrganizationRepos={getOrganizationRepos}
            />
          }
        />

        <Route
          path={`/repositories`}
          element={
            <Repositories
              repositoryData={repositoryData}
              searchQuery={searchQuery}
              getRepositoryCommits={getRepositoryCommits}
              currentRepo={currentRepo}
            />
          }
        />

        <Route path={`/commits`} element={<Commits commitData={commitData} currentRepo={currentRepo} />} />

      </Routes>
    </Router>
  );
};

export default App;
