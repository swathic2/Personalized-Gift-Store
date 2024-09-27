package winni;

import java.sql.*;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/ConnectionServlet")
public class ConnectionServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public ConnectionServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        if ("register".equalsIgnoreCase(action)) {
            registerUser(request, response);
        } else if ("login".equalsIgnoreCase(action)) {
            loginUser(request, response);
        } else {
            response.getWriter().println("Invalid action!");
        }
    }

    private void registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String uemail = request.getParameter("reg-email");
        String upassword = request.getParameter("reg-password");
        String umobile = request.getParameter("reg-mobile");

        Connection con = null;
        PreparedStatement pre = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/winni", "root", "root");
            String sql = "INSERT INTO user (email, password, mobile) VALUES (?, ?, ?)";
            pre = con.prepareStatement(sql);
            pre.setString(1, uemail);
            pre.setString(2, upassword);
            pre.setString(3, umobile);
            pre.executeUpdate();
            
            response.sendRedirect("login.jsp");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            response.getWriter().println("MySQL JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("Error registering user: " + e.getMessage());
        } finally {
            try {
                if (pre != null) pre.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private void loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String uemail = request.getParameter("email");
        String upassword = request.getParameter("password");

        Connection con = null;
        PreparedStatement pre = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/winni", "root", "root");
            String sql = "SELECT * FROM user WHERE email = ? AND password = ?";
            pre = con.prepareStatement(sql);
            pre.setString(1, uemail);
            pre.setString(2, upassword);
            rs = pre.executeQuery();

            if (rs.next()) {
                HttpSession session = request.getSession();
                session.setAttribute("user", uemail);
                response.sendRedirect("home.html");
            } else {
                response.getWriter().println("Invalid email or password!");
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            response.getWriter().println("MySQL JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("Error logging in: " + e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (pre != null) pre.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
