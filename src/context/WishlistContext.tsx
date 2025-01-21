"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { typeOfData } from "@/app/utils/types";

type WishListContext = {
    wishList : typeOfData[],
    addToWishList : (product:typeOfData)=>void,
    removeFromWishList : (productId: string)=>void
};

//Create Wish List Context
const wishListContext = createContext<WishListContext|undefined>(undefined);

export const WishListProvider = ({children}:{children: ReactNode})=>{
    const [wishList, setWishList] = useState<typeOfData[]>([]);

    const addToWishList = (product:typeOfData)=>{
        const exisitingProduct = wishList.find((e)=>e._id===product._id);
        if(!exisitingProduct){
            setWishList((prevWishList)=>[...prevWishList,product])
        }else{
            setWishList((prevWishList)=>prevWishList.filter((e)=>e._id!==product._id))
        }
    }

    const removeFromWishList = (prodcutId:string)=>{
        setWishList((prevWishList)=>prevWishList.filter((e)=>e._id!==prodcutId))
    }
    
    return(
        <wishListContext.Provider value={{wishList,addToWishList,removeFromWishList}}>
            {children}
        </wishListContext.Provider>
    )
};

export const useWishList = ()=>{
    const context = useContext(wishListContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

