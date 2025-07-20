import {useEffect} from "react";
import {Product} from "../../common/Product/Product.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllProducts} from "../../../slices/productSlice.ts";

export function Home() {

    const dispatch = useDispatch<AppDispatch>();

    const {list} = useSelector(
        (state: RootState) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    return (
        <>
            <div>
                <div
                    className="flex gap-5">
                    {
                        list.map((product) => (
                            <Product key={product.id} data={product}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
