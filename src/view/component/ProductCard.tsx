import type {ProductData} from "../../modal/ProductData.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {addToCart, saveCartData, setUserId} from "../../slices/cartSlice.ts";
import {Heart, ShoppingCart} from "lucide-react";
import {Link} from "react-router-dom";
import swal from "sweetalert2";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";


type ProductProps = {
    data: ProductData
}

export function ProductCard({data}: ProductProps) {
    // const image = images[`/src/assets/images/products/${data.image}`];

    const dispatch = useDispatch<AppDispatch>();

    // const item = useSelector(
    //     (state: RootState) =>
    //         state.cart.items.find(cartItem => cartItem.product.id === data.id)
    // );

    const addItemToCart = () => {
        try {
            dispatch(addToCart({
                productId: data.id,
                name: data.name,
                price: data.price,
                quantity: 1,
                image: fileName,
                currency: data.currency || 'Rs.'

            }));
            dispatch(saveCartData());
            swal.fire({
                icon: 'success',
                title: 'Item added to cart',
                text: `${data.name} has been added to your cart.`,
                timer: 1500
            })
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const fileName = data.image.split('/').pop();

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
            <div className="relative">
                <Link to={`/product/${data.id}`}>
                    <img
                        src={`http://localhost:3000/uploads/${fileName}`}
                        alt={data.name}
                        className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart
                        className={`w-4 h-4 ${data.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}/>
                </button>
            </div>

            <div className="p-4">
                <Link to={`/product/${data.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{data.name}</h3>
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">${data.price}</span>
                    </div>

                    <button
                        type="button"
                        onClick={addItemToCart}
                        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors z-10">
                        <ShoppingCart className="w-4 h-4"/>
                        <span className="text-sm">Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}