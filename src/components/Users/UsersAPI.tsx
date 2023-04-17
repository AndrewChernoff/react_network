import s from "./Users.module.scss";
import { UsersType } from "../../redux/reducers/usersReducer";
import { useEffect, useState } from "react";
import Users from "./Users";
import { Loader } from "../../common/Loader";
import ReactPaginate from 'react-paginate';


type UsersPropsType = {
  users: UsersType[]
  getUsers: (pageSize: number, currentPage: number) => void
  currentPage: number
  totalCount: number
  pageSize: number
  followUser: (id: number) => void
  unFollowUser: (id: number) => void
  isFetching: boolean
  followingInProgress: number[]
  getUsersOnPageClick: (pageSize: number, currentPage: number) => void
};

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: number) => (
          <div>
            <h3>{item}</h3>
          </div>
        ))}
    </>
  );
}

const UsersAPI = (props: UsersPropsType) => {
////////////fix bug with clicking pages
  useEffect(() => {
    props.getUsers(props.pageSize, props.currentPage)
  }, [])

  const [itemOffset, setItemOffset] = useState(0);


    let pages: number[] = [];

    for (
      let i = 1;
      i <= Math.ceil(props.totalCount / props.pageSize);
      i++
    ) {
      pages.push(i);
    }

    
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + props.pageSize;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = pages.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pages.length / props.pageSize);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * props.pageSize) % pages.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    props.getUsersOnPageClick(props.pageSize, event.selected)
  };

    return (
      <div className={s.users}>
        <div>
          {/* {pages.map((p) => (
            <span
              key={p}
              className={p === props.currentPage ? s.active__page : ""}
              onClick={() => {
                props.getUsersOnPageClick(props.pageSize, p)
              }}
            >
              {p}
            </span>
          ))} */}
         {/*  <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="prev"
        activeClassName={s.active__page}
        renderOnZeroPageCount={null}
        containerClassName={s.pages_container}
        pageClassName={s.page}
        previousClassName={s.prev}
        nextClassName={s.next}
      />
        </div>
        {props.isFetching ? (
          <Loader />
        ) : (
          <Users
            users={props.users}
            followUser={props.followUser}
            unFollowUser={props.unFollowUser}
            followingInProgress={props.followingInProgress}
          />
        )}
      </div>
    );
  
}

export default UsersAPI;