import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieHead from "../../components/shared/MovieHead/MovieHead";
import { ADD_ITEM_TO_CARD, REMOVE_ITEM_TO_CARD } from "../../store/actions/types";
import { maxTickets, STATUS_AVAILABLE } from "../../utilities/constants";
import globalStyles from '../../styles/global.module.scss';
export default function details(props: { ID: number }) {
  const { ID } = props;
  const dispatch = useDispatch();
  let totalTicketAvailable = useSelector((state: any) => state.storeReducer.noOfTickets);
  let currentCartItems = useSelector((state: any) => state.storeReducer.cartItems);
  let movieSourceData: any = useSelector((state: any) => state.storeReducer.sourceMovieListResponse);

  const [selectedMovie, setSelectedMovie] = useState(movieSourceData?.results?.find((el: any) => el.id == ID) || undefined)
  const [activeTimeSlot, setActiveTimeSlot]: any = useState('');
  useEffect(() => {
    if (!movieSourceData || Object.keys(movieSourceData)?.length == 0) {
      let tempObject = sessionStorage.getItem('movieListSourceData') || 'null';
      movieSourceData = JSON.parse(tempObject);
    }
    setSelectedMovie(movieSourceData?.results?.find((el: any) => el.id == ID) || undefined)

  }, [movieSourceData])


  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(currentCartItems));
  }, [currentCartItems])
  const onGoingShows = selectedMovie?.shows?.filter((el: any) => el.status == STATUS_AVAILABLE);

  const handleCart = (movieItem: any, item: any, actionToCart: boolean) => {
    if (!Object.keys(activeTimeSlot).length)
      return;
    let itemType = !!actionToCart ? ADD_ITEM_TO_CARD : REMOVE_ITEM_TO_CARD;
    let checkoutItem = {
      ...movieItem,
      showItem: item
    }
    dispatch({ type: itemType, payload: checkoutItem, })
  }

  const handleNavigationEvent = () => {
    router.push(`/checkout`);
  }
  
  return (
    <div className="container">
      <MovieHead />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Original Title</th>
            <th scope="col">Released Date</th>
            <th scope="col">Language</th>
            <th scope="col">Overview</th>
            <th scope="col">Shows Available</th>
            <th scope="col">Ratings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedMovie?.title}</td>
            <td>{selectedMovie?.original_title}</td>
            <td>{selectedMovie?.release_date}</td>
            <td>{selectedMovie?.original_language}</td>
            <td>{selectedMovie?.overview}</td>
            <td>{selectedMovie?.shows?.length}</td>
            <td>{selectedMovie?.vote_average}</td>
          </tr>
        </tbody>
      </table>
      <div className=" jumbotron pb-5">
        <div className="d-flex">
          <div className="card mb-3 p-5 w-100">
            <label><strong>Shows Available</strong></label>
            <h4 className="text-success">{onGoingShows?.length || 0}</h4>
            <label><strong>Total Cinema Screenings</strong></label>
            <h4 className="text-info">{selectedMovie?.shows?.length}</h4>
          </div>
          <div className="card mb-3 p-5 w-100">
            <label><strong>Select Date & Time</strong></label>
            <p>Please Select Screening Timings As first Step To Checkout</p>
            <div className={`d-flex mb-5  ${!Object.keys(activeTimeSlot).length && globalStyles.disable_div}`}>
              <div className={`col-2 ${totalTicketAvailable == 0 && globalStyles.disable_div}`} onClick={() => (totalTicketAvailable != 0) && handleCart(selectedMovie, activeTimeSlot, true)}>
                <img
                  src={'https://img.icons8.com/external-fauzidea-flat-fauzidea/2x/external-add-to-cart-e-commerce-fauzidea-flat-fauzidea-2.png'}
                  alt={'Add Item To Cart'}
                  height={19}
                  width={19}
                />
              </div>
              <div className={`col-2 ${totalTicketAvailable == maxTickets && globalStyles.disable_div}`} onClick={() => (totalTicketAvailable != maxTickets) && handleCart(selectedMovie, activeTimeSlot, false)}>
                <img
                  src={'https://img.icons8.com/office/452/return-purchase.png'}
                  alt={'Add Item To Cart'}
                  height={19}
                  width={19}
                />
              </div>
            </div>
            <ul className="list-group border-0">
              {selectedMovie?.shows?.map((item: any) => {
                return (
                  <div onClick={() => setActiveTimeSlot(item)} className={`d-flex ${item.status != STATUS_AVAILABLE && 'd-none'}`}>
                    <div className="col-10">
                      <li className={`list-group-item ${item.date == activeTimeSlot?.date && 'list-group-item-primary'} `}>{new Date(item.date).toLocaleString()}</li>
                    </div>
                  </div>
                )
              })}
            </ul>
          </div>
          <div className="card mb-3 p-5 w-100">
            <label><strong>Total Avaialable Tickets</strong></label>
            <h4 className="text-info">{totalTicketAvailable}</h4>
            <label><strong>Items in Cart</strong></label>
            <h4 className="text-danger">{currentCartItems?.length || 0}</h4>

          </div>

        </div>
        <button onClick={() => handleNavigationEvent()} disabled={!Object.keys(activeTimeSlot)?.length || !currentCartItems.length} type="button" className="  btn-success btn btn-primary btn-lg">Proceed To checkout</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: {

      ID: id
    },
  };
}
