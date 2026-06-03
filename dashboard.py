import streamlit as st
import httpx
import pandas as pd
import os
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import json

# Set page config
st.set_page_config(
    page_title="FoodMind - Food Recognition Dashboard",
    page_icon="🍎",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        margin: 0.5rem 0;
    }
    .upload-area {
        border: 2px dashed #667eea;
        border-radius: 10px;
        padding: 2rem;
        text-align: center;
        background: linear-gradient(135deg, #f093fb10 0%, #f5576c10 100%);
    }
    .success-card {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if "prediction_count" not in st.session_state:
    st.session_state.prediction_count = 0
    st.session_state.prediction_history = []
    st.session_state.confidence_scores = []

# Header
st.markdown("""
<div class="main-header">
    <h1>🍎 FoodMind - AI Food Recognition</h1>
    <p>Upload food images for instant nutritional analysis and identification</p>
</div>
""", unsafe_allow_html=True)

# Sidebar for Subscription Status and Usage Metrics
with st.sidebar:
    st.markdown("### 🔐 Subscription Status")
    subscription_tier = os.getenv("SUBSCRIPTION_TIER", "free").lower()
    
    if subscription_tier == "free":
        st.markdown("""
        <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 1rem; border-radius: 10px; text-align: center;">
            <h4>Free Tier</h4>
            <p>Limited to 10 predictions per day</p>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("🚀 Upgrade to Pro", use_container_width=True):
            st.markdown("[Upgrade Now](/subscription)")
    else:
        st.markdown("""
        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 1rem; border-radius: 10px; text-align: center;">
            <h4>✨ Pro Subscriber</h4>
            <p>Unlimited predictions</p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("### 📊 Usage Metrics")
    
    # Display metrics
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Total Predictions", st.session_state.prediction_count)
    with col2:
        today_predictions = len([p for p in st.session_state.prediction_history if p.get('date', '') == datetime.now().strftime('%Y-%m-%d')])
        st.metric("Today", today_predictions)
    
    # Average confidence
    if st.session_state.confidence_scores:
        avg_confidence = sum(st.session_state.confidence_scores) / len(st.session_state.confidence_scores)
        st.metric("Avg Confidence", f"{avg_confidence:.1f}%")
    
    # Top 5 predicted foods chart
    if st.session_state.prediction_history:
        st.markdown("### 🏆 Top Predicted Foods")
        
        # Count food predictions
        food_counts = {}
        for prediction in st.session_state.prediction_history:
            food = prediction.get('class_name', 'Unknown')
            food_counts[food] = food_counts.get(food, 0) + 1
        
        # Get top 5
        top_foods = sorted(food_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        if top_foods:
            df_top = pd.DataFrame(top_foods, columns=['Food', 'Count'])
            
            # Create horizontal bar chart
            fig = px.bar(
                df_top, 
                x='Count', 
                y='Food', 
                orientation='h',
                color='Count',
                color_continuous_scale='Viridis'
            )
            fig.update_layout(
                height=300,
                showlegend=False,
                margin=dict(l=0, r=0, t=0, b=0)
            )
            st.plotly_chart(fig, use_container_width=True)

# Main content area
col1, col2 = st.columns([2, 1])

with col1:
    st.markdown("### 📸 Food Image Analysis")
    
    # File uploader
    uploaded_file = st.file_uploader(
        "Choose a food image...",
        type=["jpg", "jpeg", "png"],
        help="Upload a clear image of food for AI analysis"
    )
    
    if uploaded_file is not None:
        # Display uploaded image
        st.image(uploaded_file, caption="Uploaded Image", use_container_width=True)
        
        # Analyze button
        if st.button("🔍 Analyze Food", use_container_width=True, type="primary"):
            with st.spinner("🤖 AI is analyzing your food image..."):
                try:
                    # Prepare file for API call
                    files = {"file": (uploaded_file.name, uploaded_file.getvalue(), uploaded_file.type)}
                    
                    # Call FastAPI backend
                    response = httpx.post(
                        "http://localhost:5000/predict",
                        files=files,
                        timeout=30.0
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        
                        # Display results
                        st.markdown("""
                        <div class="success-card">
                            <h3>🎯 Analysis Complete!</h3>
                        </div>
                        """, unsafe_allow_html=True)
                        
                        # Results in columns
                        res_col1, res_col2, res_col3 = st.columns(3)
                        
                        with res_col1:
                            st.metric(
                                "🍽️ Identified Food",
                                result.get('class_name', 'Unknown'),
                                help="AI-identified food item"
                            )
                        
                        with res_col2:
                            confidence = result.get('confidence', 0)
                            st.metric(
                                "🎯 Confidence",
                                f"{confidence:.1f}%",
                                help="AI confidence in prediction"
                            )
                        
                        with res_col3:
                            # Mock nutritional info
                            calories = result.get('calories', 150 + (confidence * 2))
                            st.metric(
                                "🔥 Est. Calories",
                                f"{calories:.0f} kcal",
                                help="Estimated calories per serving"
                            )
                        
                        # Update session state
                        st.session_state.prediction_count += 1
                        st.session_state.prediction_history.append({
                            'class_name': result.get('class_name', 'Unknown'),
                            'confidence': confidence,
                            'date': datetime.now().strftime('%Y-%m-%d'),
                            'timestamp': datetime.now().isoformat()
                        })
                        st.session_state.confidence_scores.append(confidence)
                        
                        # Success message
                        st.success("✅ Food analysis completed successfully!")
                        
                        # Additional nutritional insights
                        st.markdown("### 📊 Nutritional Insights")
                        
                        # Mock nutritional breakdown
                        nutrition_data = {
                            'Nutrient': ['Protein', 'Carbs', 'Fat', 'Fiber'],
                            'Amount': [12, 25, 8, 4],
                            'Unit': ['g', 'g', 'g', 'g']
                        }
                        
                        df_nutrition = pd.DataFrame(nutrition_data)
                        
                        # Create pie chart for macronutrients
                        fig_pie = px.pie(
                            df_nutrition[:3], 
                            values='Amount', 
                            names='Nutrient',
                            title="Macronutrient Breakdown",
                            color_discrete_sequence=['#ff9999', '#66b3ff', '#99ff99']
                        )
                        st.plotly_chart(fig_pie, use_container_width=True)
                        
                    else:
                        st.error(f"❌ Analysis failed: {response.status_code}")
                        st.error("Please ensure the FastAPI backend is running on port 5000")
                        
                except httpx.RequestError as e:
                    st.error("🔌 Connection Error: Cannot reach the AI backend")
                    st.error("Please ensure the FastAPI server is running:")
                    st.code("uvicorn utils.food_recognition:app --host=0.0.0.0 --port=5000")
                    
                except Exception as e:
                    st.error(f"❌ Unexpected error: {str(e)}")
    
    else:
        # Upload instructions
        st.markdown("""
        <div class="upload-area">
            <h3>📱 Upload Your Food Image</h3>
            <p>Take a photo or upload an image of your food for instant AI analysis</p>
            <ul style="text-align: left; display: inline-block;">
                <li>📸 Ensure good lighting</li>
                <li>🎯 Center the food in frame</li>
                <li>🖼️ Use high-resolution images</li>
                <li>🧹 Avoid cluttered backgrounds</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)

with col2:
    st.markdown("### 📈 Analytics Dashboard")
    
    # Prediction history chart
    if st.session_state.prediction_history:
        # Daily predictions over time
        daily_counts = {}
        for prediction in st.session_state.prediction_history:
            date = prediction.get('date', datetime.now().strftime('%Y-%m-%d'))
            daily_counts[date] = daily_counts.get(date, 0) + 1
        
        if daily_counts:
            df_daily = pd.DataFrame(list(daily_counts.items()), columns=['Date', 'Predictions'])
            df_daily['Date'] = pd.to_datetime(df_daily['Date'])
            
            fig_line = px.line(
                df_daily, 
                x='Date', 
                y='Predictions',
                title="Daily Predictions",
                markers=True
            )
            fig_line.update_layout(height=300)
            st.plotly_chart(fig_line, use_container_width=True)
        
        # Confidence distribution
        if st.session_state.confidence_scores:
            fig_hist = px.histogram(
                x=st.session_state.confidence_scores,
                nbins=10,
                title="Confidence Score Distribution",
                labels={'x': 'Confidence %', 'y': 'Count'}
            )
            fig_hist.update_layout(height=300)
            st.plotly_chart(fig_hist, use_container_width=True)
    
    else:
        st.info("📊 Upload and analyze food images to see analytics")

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #666; padding: 1rem;">
    <p>🤖 Powered by AI • 🍎 FoodMind Dashboard • 📊 Real-time Analytics</p>
    <p><small>For technical support, ensure FastAPI backend is running on port 5000</small></p>
</div>
""", unsafe_allow_html=True)

# Debug information (only show in development)
if st.checkbox("🔧 Show Debug Info"):
    st.markdown("### 🔧 Debug Information")
    st.json({
        "subscription_tier": subscription_tier,
        "prediction_count": st.session_state.prediction_count,
        "backend_url": "http://localhost:5000/predict",
        "session_state_keys": list(st.session_state.keys())
    })