import type {ProductData} from "../../modal/ProductData.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {addItemToCart} from "../../slices/cartSlice.ts";
import {Heart, ShoppingCart} from "lucide-react";
import {Link} from "react-router-dom";


type ProductProps = {
    data: ProductData
}

const images: Record<string, string> = import.meta.glob('/src/assets/images/products/*',{
        eager: true,
        import: 'default'
    });

export function ProductCard({data}: ProductProps) {
    const image = images[`/src/assets/images/products/${data.image}`];

    const dispatch = useDispatch<AppDispatch>();

    const item = useSelector(
        (state: RootState) =>
            state.cart.items.find(cartItem => cartItem.product.id === data.id)
    );

    const addToCart = () => {
        dispatch(addItemToCart(data));
    };

    return (
        <Link to={`/product/${data.id}`}>
            <div
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <div className="relative">
                    <img
                        src={image}
                        alt={data.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <Heart
                            className={`w-4 h-4 ${data.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}/>
                    </button>
                </div>

                <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{data.name}</h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${data.price}</span>
                        </div>

                        <button
                            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <ShoppingCart className="w-4 h-4"/>
                            <span className="text-sm">Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}