import { EditRounded, RefreshOutlined } from "@material-ui/icons";
import { toMatchInlineSnapshot } from "jest-snapshot";
import { FAILSAFE_SCHEMA } from "js-yaml";
import React from "react";


function Header() {

    return (
        //simple header for Liontamer
        <div className="header-div">
            <h1 className="header-h1">LionTamer</h1>
        </div>
            )
}

// LionTamer is a system modeling tool that validates the resiliency of digital engineering designs through linear temporal modeling, a mathematical language for describing how system properties change over time. Based on the Maude language which models systems as finite state machines, LionTamer can verify all possible states of a model to determine if a set of requirements holds for all events in the system. If a requirement fails, Lion Tamer will reveal the specific condition under which it fails, allowing the model to be outlined. Models are built from a set of primitives which determine how data flows through and is manipulated by the components of the model. Designs can be constructed and manipulated with a graphical editor.

export default Header;