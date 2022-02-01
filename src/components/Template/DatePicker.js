import React from 'react';
import {noop} from "../../services/generalService";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from 'date-fns/locale/es';
import blueGrey from "@material-ui/core/colors/blueGrey";
import {ThemeProvider} from "@material-ui/styles";
import {createTheme} from "@material-ui/core";
import moment from "moment";

const DatePicker = ({value = '', actualiza = noop(), variant = "dialog", maxDate = moment().add(100, 'years').toDate()}) => {

    const defaultMaterialTheme = createTheme({
        palette: {
            primary: blueGrey,
        },
    });
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                        views={["year", "month", "date"]}
                        margin="normal"
                        variant={variant}
                        value={value}
                        onChange={actualiza}
                        maxDate={maxDate}
                        format="dd/MM/yyyy"
                        className="form-control"
                        KeyboardButtonProps={{
                            "aria-label": "change-date"
                        }}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    );
};
export default DatePicker;
