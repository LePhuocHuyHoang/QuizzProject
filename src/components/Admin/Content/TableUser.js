import ReactPaginate from "react-paginate";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const TableUser = ({
  listUsers,
  pageCount,
  fetchListUsersWithPaginate,
  setCurrentPage,
  handleClickBtnView,
  handleClickBtnUpdate,
  handleClickBtnDelete,
  currentPage,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handlePageClick = useCallback(
    async (event) => {
      setLoading(true);
      await fetchListUsersWithPaginate(+event.selected + 1);
      setCurrentPage(+event.selected + 1);
      setLoading(false);
    },
    [fetchListUsersWithPaginate, setCurrentPage]
  );

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("table.username")}</th>
            <th scope="col">Email</th>
            <th scope="col">{t("table.role")}</th>
            <th scope="col">{t("table.action")}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                {t("table.loading")}
              </td>
            </tr>
          ) : listUsers && listUsers.length > 0 ? (
            listUsers.map((item, index) => (
              <tr key={`table-users-${index}`}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickBtnView(item)}
                  >
                    {t("table.view")}
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickBtnUpdate(item)}
                  >
                    {t("table.update")}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickBtnDelete(item)}
                  >
                    {t("table.delete")}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                {t("table.noData")}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="user-pagination">
        <ReactPaginate
          nextLabel={t("pagination.next")}
          previousLabel={t("pagination.prev")}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          forcePage={currentPage - 1}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </div>
    </>
  );
};

export default TableUser;
