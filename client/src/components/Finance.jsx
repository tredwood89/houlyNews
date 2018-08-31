import React, { Component } from 'react';
import moment from 'moment';
import bb from 'billboard.js';
import FinanceRow from './subComponents/FinanceRow';

class Finance extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { candidateInfo, committeeInfo } = this.props;
    bb.generate({
      bindto: `#${committeeInfo.id}-stats`,
      data: {
        type: 'bar',
        columns: [
          ['Contributions', committeeInfo.total_contributions],
          ['Individuals', committeeInfo.total_from_individuals],
          ['PACs', committeeInfo.total_from_pacs],
          [
            'Disbursements',
            committeeInfo.total_contributions -
              committeeInfo.total_disbursements
          ],
          ['Available', committeeInfo.total_disbursements]
        ],
        colors: {
          Contributions: '#28a745',
          Individuals: '#17a2b8',
          PACs: '#ffc107',
          Disbursements: '#dc3545',
          Available: '#28a745'
        }
      },
      interaction: {
        enabled: false
      }
    });

    bb.generate({
      bindto: `#${committeeInfo.id}-usage`,
      data: {
        type: 'donut',
        columns: [
          [
            'Available',
            committeeInfo.total_contributions -
              committeeInfo.total_disbursements
          ],
          ['Disbursed', committeeInfo.total_disbursements]
        ],
        colors: {
          Available: '#28a745',
          Disbursed: '#dc3545'
        }
      },
      interaction: {
        enabled: false
      }
    });

    bb.generate({
      bindto: `#${candidateInfo.id}-usage`,
      data: {
        type: 'donut',
        columns: [
          [
            'Available',
            candidateInfo.total_contributions -
              candidateInfo.total_disbursements
          ],
          ['Disbursed', candidateInfo.total_disbursements]
        ],
        colors: {
          Available: '#28a745',
          Disbursed: '#dc3545'
        }
      },
      interaction: {
        enabled: false
      }
    });

    bb.generate({
      bindto: `#${candidateInfo.id}-origin`,
      data: {
        type: 'donut',
        columns: [
          ['Individuals', candidateInfo.total_from_individuals],
          ['PACs', candidateInfo.total_from_pacs]
        ],
        colors: {
          Individuals: '#1b4062',
          PACs: '#8DC6E8'
        }
      },
      interaction: {
        enabled: false
      }
    });

    bb.generate({
      bindto: `#${committeeInfo.id}-origin`,
      data: {
        type: 'donut',
        columns: [
          ['Individuals', committeeInfo.total_from_individuals],
          ['PACs', committeeInfo.total_from_pacs]
        ],
        colors: {
          Individuals: '#1b4062',
          PACs: '#8DC6E8'
        }
      },
      interaction: {
        enabled: false
      }
    });
  }

  render() {
    const { candidateInfo, committeeInfo } = this.props;

    console.log(candidateInfo);
    console.log(committeeInfo);

    return <div className="container">
        <a href={committeeInfo.fec_uri} target="_blank">
          {committeeInfo.name}
        </a>
        <p>
          {moment(committeeInfo.date_coverage_from).format('MMMM DD, YYYY')} through {moment(committeeInfo.date_coverage_to).format('MMMM DD, YYYY')}
        </p>
        <div className="w-100 border-bottom my-2" />

        <FinanceRow prefix="Start" title={moment(committeeInfo.date_coverage_from).format('MM/DD/YY')} amount={committeeInfo.begin_cash} color={null} />
        <FinanceRow prefix="End" title={moment(committeeInfo.date_coverage_to).format('MM/DD/YY')} amount={committeeInfo.end_cash} color={null} />
        <div className="w-100 border-bottom my-2" />

        <h2>Stats</h2>
        <div id={`${committeeInfo.id}-stats`} />
        <div className="w-100 border-bottom my-2" />

        <FinanceRow prefix="Total" title="Contributions" amount={committeeInfo.total_contributions} color="success" />
        <FinanceRow prefix="Total" title="Receipts" amount={committeeInfo.total_receipts} color="success" />
        <FinanceRow prefix="Total" title="From Individuals" amount={committeeInfo.total_from_individuals} color="info" />
        <FinanceRow prefix="Total" title="From PACs" amount={committeeInfo.total_from_pacs} color="warning" />
        <FinanceRow prefix="Total" title="Disbursements" amount={committeeInfo.total_disbursements} color="danger" />
        <FinanceRow prefix="Total" title="Available" amount={committeeInfo.total_contributions - committeeInfo.total_disbursements} color="success" />

        <div className="w-100 border-bottom my-2" />

        <FinanceRow prefix="Total" title="Refunds" amount={committeeInfo.total_refunds} color="danger" />
        <FinanceRow prefix="Total" title="Refunds to Individuals" amount={committeeInfo.total_individual_refunds} color="info" />
        <FinanceRow prefix="Total" title="Refunds to PACs" amount={committeeInfo.total_pac_refunds} color="warning" />

        <div className="w-100 border-bottom my-2" />

        <FinanceRow prefix="Total" title="Individual Unitemized" amount={committeeInfo.total_individual_unitemized} color="" />
        <FinanceRow prefix="Total" title="Candidate Contributions" amount={committeeInfo.total_candidate_contributions} color="" />
        <FinanceRow prefix="" title="Independent Expenditures" amount={committeeInfo.total_independent_expenditures} color="" />
        {/* <FinanceRow prefix="" title="Coordinated Expenditures" amount={committeeInfo.total_coordinated_expenditures} color="" /> */}

        <div className="w-100 border-bottom my-2" />

        <h2>Usage</h2>
        <div id={committeeInfo.id + '-usage'} />
        <div className="w-100 border-bottom my-2" />
        <h2>Origin</h2>
        <div id={committeeInfo.id + '-origin'} />
        <div className="w-100 border-bottom my-2" />

        <a href={candidateInfo.fec_uri} target="_blank">
          {candidateInfo.name}
        </a>
        <div className="w-100 border-bottom my-2" />

        <FinanceRow prefix="Begin" title={moment(candidateInfo.date_coverage_from).format('MM/DD/YY')} amount={candidateInfo.begin_cash} color={null} />
        <FinanceRow prefix="End" title={moment(candidateInfo.date_coverage_to).format('MM/DD/YY')} amount={candidateInfo.end_cash} color={null} />

        <div className="w-100 border-bottom my-2" />

        <FinanceRow prefix="Total" title="Contributions" amount={candidateInfo.total_contributions} color="success" />
        <FinanceRow prefix="Total" title="From Individuals" amount={candidateInfo.total_from_individuals} color="info" />
        <FinanceRow prefix="Total" title="From PACs" amount={candidateInfo.total_from_pacs} color="warning" />
        <FinanceRow prefix="Total" title="Disbursements" amount={candidateInfo.total_disbursements} color="danger" />
        <FinanceRow prefix="Total" title="Available" amount={candidateInfo.total_contributions - candidateInfo.total_disbursements} color="success" />
        <FinanceRow title="Independent Expenditures" amount={candidateInfo.independent_expenditures} />
        <div className="w-100 border-bottom my-2" />

        <h2>Usage</h2>
        <div id={candidateInfo.id + '-usage'} />
        <div className="w-100 border-bottom my-2" />
        <h2>Origin</h2>
        <div id={candidateInfo.id + '-origin'} />
      </div>;
  }
}

export default Finance;
