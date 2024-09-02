import app from "@/api/FirebaseConfig";
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

const useAdminContext = () => useContext(AdminContext);
export const db = getFirestore(app);

const AdminProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]); // Fixed typo
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    const fetchDashboardDataAndSetListeners = async () => {
      try {
        // Real-time listener for bookings
        const bookingsRef = collection(db, "bookings");
        const bookingsQuery = query(bookingsRef);
        const unsubscribeBookings = onSnapshot(
          bookingsQuery,
          (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((doc) => {
              documents.push({ id: doc.id, ...doc.data() });
            });
            setBookings(documents);
          }
        );

        // Real-time listener for customers
        const usersRef = collection(db, "customers");
        const usersQuery = query(usersRef);
        const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
          });
          console.log(documents);
          setCustomers(documents); // Fixed typo
        });

        // Real-time listener for plots
        const plotsRef = collection(db, "plots"); // Changed collection to "plots"
        const plotsQuery = query(plotsRef);
        const unsubscribePlots = onSnapshot(plotsQuery, (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
          });
          console.log(documents);
          setPlots(documents);
        });

        // Clean up listeners on unmount
        return () => {
          unsubscribeBookings();
          unsubscribeUsers();
          unsubscribePlots();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardDataAndSetListeners();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        bookings,
        customers,
        plots,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };
export default useAdminContext;
