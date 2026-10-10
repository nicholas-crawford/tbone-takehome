import rawContent from "./content/bz4x.json"
import { pageContentSchema } from "./content/schema"
import { LandingPage } from "./pages/LandingPage"

const content = pageContentSchema.parse(rawContent)

function App() {
    return <LandingPage content={content} />
}

export default App
