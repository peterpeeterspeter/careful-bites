import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function TopUtilityBar() {
  const { user } = useAuth();

  return (
    <div className="bg-[#1B4332] text-white text-sm py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/subscribe" className="hover:text-green-200">Join CarefulCuisine Club</Link>
          <span>|</span>
          <Link to="/newsletter" className="hover:text-green-200">Diabetes Newsletter</Link>
          <span>|</span>
          <Link to="/shows" className="hover:text-green-200">Cooking Classes</Link>
          <span>|</span>
          <Link to="/app" className="hover:text-green-200">Track with Our App</Link>
          <span>|</span>
          <Link to="/planet" className="hover:text-green-200">Sugar-Free Living</Link>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <Link to="/profile" className="hover:text-green-200">My Health Profile</Link>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-200">Sign in</Link>
              <span>|</span>
              <Link to="/register" className="hover:text-green-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}