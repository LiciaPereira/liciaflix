import React, { useEffect, useState } from "react";
import "../styles/PlanPage.css";
import db from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansPage() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = {};

      //query to get all active products
      const productsQuery = query(
        collection(db, "products"),
        where("active", "==", true)
      );
      const querySnapshot = await getDocs(productsQuery);

      //process each product document
      for (const productDoc of querySnapshot.docs) {
        const productData = productDoc.data();

        //initialize product in productsData object
        productsData[productDoc.id] = productData;

        //fetch prices collection for each product
        const pricesCollectionRef = collection(
          db,
          "products",
          productDoc.id,
          "prices"
        );
        const priceSnap = await getDocs(pricesCollectionRef);

        //attach price information to the product data
        priceSnap.docs.forEach((priceDoc) => {
          productsData[productDoc.id].prices = {
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          };
        });
      }

      //update state with fetched products data
      setProducts(productsData);
    };

    fetchProducts().catch(console.error);
  }, []);

  const loadCheckout = async (priceId) => {
    try {
      //reference the "checkout_sessions" collection under the user's document
      const checkoutSessionsRef = collection(
        db,
        "customers",
        user.uid,
        "checkout_sessions"
      );

      //add a new checkout session document
      const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      //listen for updates on this session document
      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();

        if (error) {
          console.log("Error in checkout session:", error);
        }

        if (sessionId) {
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_TEST_KEY
          );
          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="plansPage">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="plansPage__plan" key={productData.prices.priceId}>
            <div className="plansPage__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansPage;
