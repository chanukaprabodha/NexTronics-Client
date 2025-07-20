import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";


export function ShoppingCart() {

    const {items} = useSelector((state: RootState) => state.cart);

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-screen-xl border border-green-200">
                <table className="min-w-full border-collapse text-center">
                    <thead>
                    <tr className="bg-green-400 text-black">
                        <th className="text-shadow-2xs font-semibold border border-green-300 p-4">Id</th>
                        <th className="text-shadow-2xs font-semibold border border-green-300 p-4">Name</th>
                        <th className="text-shadow-2xs font-semibold border border-green-300 p-4">Unit Price</th>
                        <th className="text-shadow-2xs font-semibold border border-green-300 p-4">Quantity</th>
                        <th className="text-shadow-2xs font-semibold border border-green-300 p-4">Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="border border-green-300 bg-green-100 p-5">
                                    <p className="text-center text-sm text-black">No items in the cart...!</p>
                                </td>
                            </tr>
                        ) : (
                            items.map((item, index) => (
                                <tr key={item.product.id} className={
                                    `${index % 2 === 0 ? 'bg-white' : 'bg-green-50'}
                                        hover:bg-green-100 border border-green-300`}
                                >
                                    <td className="p-4">{item.product.id}</td>
                                    <td className="p-4">{item.product.name}</td>
                                    <td className="p-4">{item.product.price}
                                        {item.product.currency}
                                    </td>
                                    <td className="p-4">{item.itemCount}</td>
                                    <td className="p-4">{item.itemCount * item.product.price}
                                        {item.product.currency}
                                    </td>
                                </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}