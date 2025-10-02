/// <reference types="chrome"/>
import AddContextScreen from "./pages/add-context-screen";
import DashboardScreen from "./pages/dashboard-screen";
import ApiKeyEntryScreen from "./pages/entry-point";
import ErrorScreen from "./pages/error-screen";
import GenerationProgress from "./pages/generation-progress-screen";

function App() {
  const PageStates = {
    AUTH: "AUTH",
    DASHBOARD: "DASHBOARD",
    GENERATING: "GENERATING",
    CONTEXT: "CONTEXT",
    ERROR: "ERROR",
  } as const;

  const currentState = PageStates.ERROR;

  const stateToComponentsMap = {
    [PageStates.AUTH]: <ApiKeyEntryScreen />,
    [PageStates.DASHBOARD]: <DashboardScreen />,
    [PageStates.GENERATING]: <GenerationProgress />,
    [PageStates.CONTEXT]: <AddContextScreen />,
    [PageStates.ERROR]: (
      <ErrorScreen
        onRetry={() => console.log("Retry clicked")}
        onGoHome={() => console.log("Go home clicked")}
      />
    ),
  };

  return <>{stateToComponentsMap[currentState]}</>;
}

export default App;
