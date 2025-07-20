import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import Swal from "sweetalert2";
import {decreaseQuantity, increaseQuantity} from "../../../slices/cartSlice.ts";

interface ModifyCartProps {
    data: any
}

export function ModifyCart({data}: ModifyCartProps) {

    const dispatch = useDispatch<AppDispatch>();

    const item = useSelector(
        (state: RootState) => state.cart.items.find(cartItem => cartItem.product.id === data.id
        ));


    const decreaseItemCount = () => {
        if (item && item.itemCount > 1) {
            dispatch(decreaseQuantity(data.id));
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Item count cannot be less than 1',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };

    const increaseItemCount = () => {
        dispatch(increaseQuantity(data.id));
    };
    return (
        <>
            <div className="w-full mt-1 p-[2.4px] text-[8px] text-center">
                <button
                    className='float-left text-[16px] bg-yellow-300 rounded-lg h-8 w-8 cursor-pointer hover:bg-amber-200'
                    onClick={decreaseItemCount}>-
                </button>
                <small className='text-[20px] ml-3 mr-3'>{item?.itemCount}</small>
                <button
                    className='float-right text-[16px] bg-yellow-300 rounded-lg h-8 w-8 cursor-pointer hover:bg-amber-200'
                    onClick={increaseItemCount}>+
                </button>
            </div>
        </>
    );
}
