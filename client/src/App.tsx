import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Timeline from "./pages/Timeline";
import Methodology from "./pages/Methodology";
import Action from "./pages/Action";
import Research from "./pages/Research";
import MapPage from "./pages/Map";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (    <Switch>
      <Route path={"/"} component={Research} />
      <Route path={"/map"} component={MapPage} />
      <Route path={"/home"} component={Home} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/timeline"} component={Timeline} />
      <Route path={"/methodology"} component={Methodology} />
      <Route path={"/action"} component={Action} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
