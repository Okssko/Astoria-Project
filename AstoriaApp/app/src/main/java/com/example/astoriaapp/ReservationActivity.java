package com.example.astoriaapp;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Calendar;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;

public class ReservationActivity extends AppCompatActivity {

    private EditText nameEditText, emailEditText, phoneEditText, dateEditText, timeEditText, guestsEditText;
    private Button btnReserve;

    private OkHttpClient client = new OkHttpClient();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation);

        // Initialize the EditText fields for user inputs
        nameEditText = findViewById(R.id.name);
        emailEditText = findViewById(R.id.email); // Initialize email field
        phoneEditText = findViewById(R.id.phone);
        dateEditText = findViewById(R.id.date);
        timeEditText = findViewById(R.id.time);
        guestsEditText = findViewById(R.id.guests);
        btnReserve = findViewById(R.id.btnReserve);

        // Set DatePicker and TimePicker dialogs
        dateEditText.setOnClickListener(v -> showDatePickerDialog());
        timeEditText.setOnClickListener(v -> showTimePickerDialog());

        // Set the click listener for the Reserve button
        btnReserve.setOnClickListener(v -> {
            String name = nameEditText.getText().toString();
            String email = emailEditText.getText().toString(); // Get email input
            String phone = phoneEditText.getText().toString();
            String date = dateEditText.getText().toString();
            String time = timeEditText.getText().toString();
            String guests = guestsEditText.getText().toString();

            // Validate inputs
            if (name.isEmpty() || email.isEmpty() || phone.isEmpty() || date.isEmpty() || time.isEmpty() || guests.isEmpty()) {
                Toast.makeText(ReservationActivity.this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
                return;
            }

            // Create reservation data as JSON
            try {
                JSONObject reservationData = new JSONObject();
                reservationData.put("name", name);
                reservationData.put("email", email); // Include email in JSON
                reservationData.put("phone", phone);
                reservationData.put("date", date);
                reservationData.put("time", time);
                reservationData.put("guests", guests);

                // URL to the server
                String url = "http://10.0.2.2:5000/api/reservations"; // localhost for Android emulator

                // Send the reservation data
                sendReservationData(url, reservationData.toString());

            } catch (JSONException e) {
                e.printStackTrace();
            }
        });
    }

    // Method to show DatePickerDialog
    private void showDatePickerDialog() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DAY_OF_MONTH);

        DatePickerDialog datePickerDialog = new DatePickerDialog(
                ReservationActivity.this,
                (view, year1, month1, dayOfMonth) -> {
                    String selectedDate = year1 + "-" + (month1 + 1) + "-" + dayOfMonth;
                    dateEditText.setText(selectedDate);
                },
                year, month, day);
        datePickerDialog.show();
    }

    // Method to show TimePickerDialog
    private void showTimePickerDialog() {
        Calendar calendar = Calendar.getInstance();
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minute = calendar.get(Calendar.MINUTE);

        TimePickerDialog timePickerDialog = new TimePickerDialog(
                ReservationActivity.this,
                (view, hourOfDay, minute1) -> {
                    String selectedTime = String.format("%02d:%02d", hourOfDay, minute1);
                    timeEditText.setText(selectedTime);
                },
                hour, minute, true);
        timePickerDialog.show();
    }

    // Method to send reservation data to the server
    private void sendReservationData(String url, String jsonBody) {
        MediaType JSON = MediaType.get("application/json; charset=utf-8");

        RequestBody body = RequestBody.create(jsonBody, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                runOnUiThread(() -> {
                    Toast.makeText(ReservationActivity.this, "Failed to connect to the server", Toast.LENGTH_SHORT).show();
                    Log.e("Reservation", "Error: " + e.getMessage());
                });
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    runOnUiThread(() -> {
                        Toast.makeText(ReservationActivity.this, "Reservation successful", Toast.LENGTH_SHORT).show();
                    });
                } else {
                    runOnUiThread(() -> {
                        Toast.makeText(ReservationActivity.this, "Reservation failed", Toast.LENGTH_SHORT).show();
                        try {
                            Log.e("Reservation", "Error: " + response.body().string());
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    });
                }
            }
        });
    }
}
