import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionSlice';
import SpinnerLoader from '../../components/Spinner/Spinner';
import TryAgain from './../../components/TryAgain/TryAgain'

function Transaction ({ transactions, isFetching, error, get }) {
  // const transactions = [
  //   {
  //     id: 1,
  //     userId: 1,
  //     createdAt: '2024-01-01',
  //     operationType: 'INCOME',
  //     summ: 10,
  //   },
  //   {
  //     id: 2,
  //     userId: 1,
  //     createdAt: '2024-01-01',
  //     operationType: 'INCOME',
  //     summ: 10,
  //   },
  // ];

  useEffect(() => {
    get();
  }, [get]);
  const mapTransactions = t => (
    <tr key={t.id}>
      <td>{t.createdAt}</td>
      <td>{t.operationType}</td>
      <td>{t.summ}</td>
    </tr>
  );
  return (
    <>
      <Header />
      <main>
        {isFetching && <SpinnerLoader />}
        {error && <TryAgain getData={get}/>}
        {!isFetching && !error && (
          <table>
            <caption>Your Transaction</caption>
            <thead>
              <tr>
                <th key={1}>Date</th>
                <th key={2}>Operation type</th>
                <th key={3}>Summ</th>
              </tr>
            </thead>
            <tbody>{transactions.map(mapTransactions)}</tbody>
          </table>
        )}
      </main>
    </>
  );
}

const mapStateToProps = ({ transactionStore }) => transactionStore;

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
