import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Spinner,
  Container,
  Jumbotron,
  Table,
} from 'reactstrap'

import { fetchRepo } from '../../actions/fetchRepo'
import { REPO_COMPONENT_CLASS_NAME } from '../../constants'
import { has, getUpdateString } from '../../utilities'
import { Badge } from '../Badge'
import { GroupSpacer } from '../GroupSpacer'

export class Repo extends Component {
  componentDidMount() {
    const { noDataYet, getRepo, repo } = this.props
    const { name } = repo
    if (noDataYet) {
      getRepo(name)
    }
  }

  render() {
    const { repo, noDataYet } = this.props

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

    const { name: licenseName } = license

    const updateStr = getUpdateString(updatedAt)
    const createStr = getUpdateString(createdAt)

    return (
      <div className={REPO_COMPONENT_CLASS_NAME}>
        <Jumbotron>
          <h2 className="display-3">{name}</h2>
          <GroupSpacer>
            <Badge key={`updated${updateStr}`} textA="Last updated" textB={updateStr} />
            <Badge key={`size${size}`} textA="Size" textB={size} />
          </GroupSpacer>
          <p>
            <br />
            <span className="text-muted font-italic">{`"${description}"`}</span>
          </p>
          <hr className="my-2" />
          <a rel="noopener noreferrer" target="_blank" href={htmlUrl}>{htmlUrl}</a>
          <br />
          <br />
          <Table responsive striped>
            <tbody>
              <tr>
                <th scope="row">Created</th>
                <td>{createStr}</td>
                <td />
                <td />
              </tr>
              <tr>
                <th scope="row">Language</th>
                <td>{language}</td>
                <td />
                <td />
              </tr>
              <tr>
                <th scope="row">License</th>
                <td>{licenseName}</td>
                <td />
                <td />
              </tr>
              <tr>
                <th scope="row">Forks</th>
                <td>{forks}</td>
                <td />
                <td />
              </tr>
              <tr>
                <th scope="row">Forks</th>
                <td>{forks}</td>
                <td />
                <td />
              </tr>
              <tr>
                <th scope="row">Stars</th>
                <td>{stars}</td>
                <td />
                <td />
              </tr>
              <tr>
                <th scope="row">Open Issues</th>
                <td>{openIssues}</td>
                <td />
                <td />
              </tr>
            </tbody>
          </Table>
        </Jumbotron>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const propObj = { ...state, noDataYet: false }
  if (!has.call(propObj.repo, 'name')) {
    propObj.repo.name = ownProps.match.params.name
    propObj.noDataYet = true
  }
  return propObj
}

const mapActionsToProps = {
  getRepo: fetchRepo,
}

export default connect(mapStateToProps, mapActionsToProps)(Repo)
