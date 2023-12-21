import React from "react"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"

import { Terminal } from "lucide-react"
import Header from "src/components/common/Header"

export default function Main() {
	return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
    </div>
	)
}
