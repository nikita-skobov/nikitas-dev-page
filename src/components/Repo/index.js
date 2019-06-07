import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Spinner,
  Container,
  Jumbotron,
} from 'reactstrap'

import ConnectedReportList from '../ReportList'
import { fetchRepo } from '../../actions/fetchRepo'
import { REPO_COMPONENT_CLASS_NAME } from '../../constants'
import { has, getUpdateString } from '../../utilities'
import { Badge } from '../Badge'
import { DetailTable } from '../DetailTable'
import { DetailTableEntry as Dte } from '../DetailTableEntry'
import { GroupSpacer } from '../GroupSpacer'
import { fetchReport } from '../../actions/fetchRepoReport'

export class Repo extends Component {
  componentDidMount() {
    const {
      noDataYet,
      getRepo,
      getRepoReport,
      repo,
      hasReport,
    } = this.props

    const { name } = repo

    if (noDataYet) {
      getRepo(name)
    }
    if (!hasReport) {
      getRepoReport(name)
    }
  }

  render() {
    const { repo, noDataYet, hasReport, reportData } = this.props

    if (noDataYet) {
      return (
        <Container className={`d-flex h-100 ${REPO_COMPONENT_CLASS_NAME}`}>
          <Spinner className="mx-auto d-block align-self-center" color="dark" />
        </Container>
      )
    }

    const {
      name,
      size,
      forks,
      language,
      license,
      description,
      pushed_at: updatedAt,
      created_at: createdAt,
      html_url: htmlUrl,
      stargazers_count: stars,
      open_issues: openIssues,
    } = repo

    // destructure the license object to get the name property, and rename
    // the name property to licenseName (since name is already defined above)
    // if license is null, destructure from { name: 'None :(' } instead
    const { name: licenseName } = license === null ? { name: 'None :(' } : license

    const updateStr = getUpdateString(updatedAt)
    const createStr = getUpdateString(createdAt)

    const badges = [
      <Badge key={`updated${updateStr}`} template="flat-square" textA="Last updated" textB={updateStr} />,
      <Badge key={`size${size}`} template="flat-square" textA="Size" textB={size} />,
    ]

    if (hasReport) {
      reportData.badges.forEach((badgeData) => {
        const badgeKeys = {
          textA: badgeData.text[0],
          textB: badgeData.text[1],
          ...badgeData,
        }

        badges.push(
          <Badge
            key={`${name}_report_${badgeKeys.textA}`}
            template="flat-square"
            {...badgeKeys}
          />,
        )
      })
    }

    return (
      <div className={REPO_COMPONENT_CLASS_NAME}>
        <Jumbotron style={{ paddingTop: 0 }} className="bg-white">
          <div className="repo-main-info">
            <h2 className="display-3">{name}</h2>
            <GroupSpacer>
              {badges}
            </GroupSpacer>
            <br />
            <p className="text-muted font-italic">{`"${description}"`}</p>
            <a rel="noopener noreferrer" target="_blank" href={htmlUrl}>{htmlUrl}</a>
            <br />
            <br />
          </div>
          <DetailTable>
            <Dte label="Created">{createStr}</Dte>
            <Dte label="Language">{language}</Dte>
            <Dte label="License">{licenseName}</Dte>
            <Dte label="Forks">{forks}</Dte>
            <Dte label="Stars">{stars}</Dte>
            <Dte label="Open Issues">{openIssues}</Dte>
          </DetailTable>
          <ConnectedReportList repoName={name} reportData={reportData} />
        </Jumbotron>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const propObj = {
    repo: { ...state.repo },
    noDataYet: false,
  }
  if (!has.call(propObj.repo, 'name')) {
    propObj.repo.name = ownProps.match.params.name
    propObj.noDataYet = true
  }
  const repoName = propObj.repo.name
  propObj.hasReport = state.reports[repoName] ? state.reports[repoName].hasReport : false
  if (propObj.hasReport) {
    propObj.reportData = { ...state.reports[repoName].reportData }
  }
  return propObj
}

const mapActionsToProps = {
  getRepo: fetchRepo,
  getRepoReport: fetchReport,
}

export default connect(mapStateToProps, mapActionsToProps)(Repo)
